/*
Node.js ve Express.js kullanarak register projesi için gerekli yönetim sistemlerinde kullanmak üzere
CRUD (Create Read Update Delete) için gerekli API'ler yazalım.
Yazacağımız API ile MongoDB veritabanında register projemiz için yazma, okuma, silme, güncelleme işlemleri yapacağız.
Aşağıdaki kodta Exress.js yardımıyla Router  nesnesini farklı HTTP isteklerine cevap verebilecek API ile router yapılar oluşturulacaktır.
*/

/*
http://localhost:1111/	index44.html açılacak
http://localhost:1111/register	register.ejs açılacak
http://localhost:1111/register/api	JSON formatında register listesi dönecek
http://localhost:1111/register/api/:id	Belirli registeru getirecek
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Express (Express:  Node.js için esnek bir web uygulama çatısını inşa eder)
// Bu modüllerle beraber HTTP istekleri(request) işleyecek ve istemciye(server) yanıt dönecektir.

// Express Import
const express = require("express");

// Express için Log
const morgan = require("morgan");

// Express App
const app = express(); // Express app oluştur.

// Morgan Aktifleştirmek
// Morgan'ı Express.js uygulamasında kullanalım.
// app.use(morgan('dev')); //dev: kısa ve renkli loglar göster
app.use(morgan("combined")); //dev: uzun ve renkli loglar göster

// Router Import
const router = express.Router();

// Mongoose registerPostSchema Import
const RegisterModel = require("../models/mongoose_blog_register_models");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dikkat: `router.` sonda yapılacak işlemlerde sadece ama sadece get,post,put,delete
// Örnek:get(find, list), post(create), put(Güncelleme), delete(Silme) yazmak zorundayız.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DRY Principle (Don't Repeat Yourself)
const handleError = (err, response, message) => {
    console.error(err);
    response.status(400).json({message});
}; //end handleError


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE register
// POST isteği ile yeni bir register datası oluşturuyoruz.
// Gönderilen bu veriyi almak için request.body ile içeri aktarmış olacağız.
// http://localhost:1111

router.post("/api", async (request, response) => {
    try {
        const { username, email, password } = request.body;
        
        // Email kontrolü
        const existingUser = await RegisterModel.findOne({ email });
        if (existingUser) {
            return response.status(409).json({ message: "Bu email adresi zaten kayıtlı!" });
        }

        // Yeni kullanıcı oluştur
        const newUser = new RegisterModel({
            username,
            email,
            password // Gerçek uygulamada şifre hash'lenmelidir
        });

        await newUser.save();
        response.status(201).json({ message: "Kullanıcı başarıyla kaydedildi" });
    } catch (err) {
        handleError(err, response, "Kullanıcı kaydı sırasında bir hata oluştu");
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////
// LIST register
// GET isteği ile mongodb üzerinden bütün verileri alacağız.
// http://localhost:1111
router.get("/api", async (request, response) => {
    try {
        const users = await RegisterModel.find()
            .select('-password') // Şifreyi hariç tut
            .sort({ createdAt: -1 }); // En son kayıt olanlar üstte
        response.status(200).json(users);
    } catch (err) {
        handleError(err, response, "Kullanıcılar listelenirken bir hata oluştu");
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE register
// PUT isteği ile mongodb üzerinden veri güncelleyeceğiz.
// NOT: delete ve update işlemlerinde ID kullanılır.
router.put("/:id", async (request, response) => {
    try {
        // MongoDB üzerinden id ile istek attık
        const update = await RegisterModel.findByIdAndUpdate(// ID almak
            request.params.id, request.body, {new: true}); //end update

        // Dönüş değeri
        response.status(200).json(update);

        // Güncelleme başarılı
        console.log("Güncelleme Başarılı");
    } catch (err) {
        handleError(err, response, "MongoDB'de Güncelleme Sırasında Hata Meydana geldi");
    } //end catch
}); //end update => put

/////////////////////////////////////////////////////////////////////////////////////////////
// DELETE register
// DELETE isteği ile mongodb üzerinden id ile sileceğiz.
// http://localhost:1111/1

router.delete("/api/:id", async (request, response) => {
    try {
        const id = request.params.id;
        await RegisterModel.findByIdAndDelete(id);
        response.status(200).json({ message: `${id} ID'li kullanıcı silindi` });
    } catch (err) {
        handleError(err, response, "Kullanıcı silinirken bir hata oluştu");
    }
});

/////////////////////////////////////////////////////////////
// EXPORT
module.exports = router;

/////////////////////////////////////////////////////////////
// POSTMAN, cURL api test araçlarından bir tanesini kullanabilirsiniz.
/*
{
    "header": "başlık",
    "content": "başlık",
    "author": "Hamit Mızrak",
    "tags": "node",
}
*/
