/*
Node.js ve Express.js kullanarak blog projesi için gerekli yönetim sistemlerinde kullanmak üzere
CRUD (Create Read Update Delete) için gerekli API'ler yazalım.
Yazacağımız API ile MongoDB veritabanında blog projemiz için yazma, okuma, silme, güncelleme işlemleri yapacağız.
Aşağıdaki kodta Exress.js yardımıyla,
Router  nesnesini farklı HTTP isteklerine cevap verebilecek API ile router yapılar oluşturulacaktır.
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Express (Express:  Node.js için esnek bir web uygulama çatısını inşa eder)
// Bu modüllerle beraber HTTP istekleri(request) işleyecek ve istemciye(server) yanıt dönecektir.

// Express Import
const express = require("express");

// Log
const morgan = require("morgan");

// Express app oluştur.
const app = express();

// Morgan Aktifleştirmek
// Morgan'ı Express.js uygulamasında kullanalım.
// app.use(morgan('dev')); //dev: kısa ve renkli loglar göster
app.use(morgan("combined")); //dev: uzun ve renkli loglar göster

// Router Import
const router = express.Router();

// Mongoose BlogPostSchema Import
const MongooseBlogModelApi = require("../models/mongoose_blog_models");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// C R U D API (Node.js ve Express.js tabanlı blog API yönetim sistemini MONGODB ile bağlantı kurması için bu API'ları yazıyoruz.)
// Dikkat: `router.` sonda yapılacak işlemlerde sadece ama sadece get,post,put,delete
// Örnek:get(find, list), post(create), put(Güncelleme), delete(Silme) yazmak zorundayız.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRY Principle (Don't Repeat Yourself)
const handleError = (err, response, message) => {
  console.error(err);
  response.status(400).json({ message });
}; //end handleError

/////////////////////////////////////////////////////////////////////////////////////////////
// LIST BLOG
// GET isteği ile mongodb üzerinden bütün verileri alacağız.
// http://localhost:1111

/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieves a list of all blogs
 *     responses:
 *       200:
 *         description: Successfully retrieved list of blogs
 */
router.get("/", async (request, response) => {
  try {
    // MongoDB üzerinden get isteği attık
    const find = await MongooseBlogModelApi.find();

    // Tarihi Bizim istediğimiz şekilde yazalım.
    const formattedDateTurkish = await Promise.all(
      find.map(async (temp) => {
        // Görüntüleme sayısını artırma
        await temp.incrementViews();

        return {
          ...temp._doc, // Tüm blog verilerini kopyala
          dateInformation: new Date(temp.createdAt).toLocaleString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            second: "2-digit",
          }), //end createdAt
        }; //end return
      })
    ); //end formattedDateTurkish

    // Her blog sayfasına bakıldıkça sayacçı 1 artır
    // const viewCounter = await Promise.all(
    //   find.map(async (blog) => {
    //     await blog.incrementViews(); // Görüntüleme sayısını artır
    //     return blog;
    //   }) // end map
    // ); //end viewCounter
    // Dönüş değeri

    response.status(200).json(formattedDateTurkish);

    // Listeleme başarılı
    console.log("Listeleme Başarılı");
  } catch (err) {
    handleError(
      err,
      response,
      "MongoDB'de Listeleme Sırasında Hata Meydana geldi"
    );
  } //end catch
}); //end list => get

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE BLOG
// POST isteği ile yeni bir blog datası oluşturuyoruz.
// Gönderilen bu veriyi almak için request.body ile içeri aktarmış olacağız.
// http://localhost:1111

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     description: Adds a new blog to the collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               header:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created new blog
 */
router.post("/", async (request, response) => {
  // Mongoose Blog Model Verileri Almak
  const create = new MongooseBlogModelApi({
    header: request.body.header,
    content: request.body.content,
    author: request.body.author,
    tags: request.body.tags,
  }); //end create

  // Mongoose Blog Modelda Alınan Verileri Gönder
  try {
    // MongoDB'ye kaydet
    await create.save();

    // Başarılı durumda status(200) döndüğünde
    response.status(200).json(create);

    // Ekleme başarılı
    let blogAdd = "Blog Eklemesi başarılı";
    console.warn(blogAdd);
    console.warn(create);
    alert(blogAdd);
  } catch (err) {
    handleError(
      err,
      response,
      "MongoDB'de Ekleme Sırasında Hata Meydana geldi"
    );
  } //end catch
}); //end create => post

/////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE BLOG
// PUT isteği ile mongodb üzerinden veri güncelleyeceğiz.
// NOT: delete ve update işlemlerinde ID kullanılır.
// http://localhost:1111/1

/**
 * @swagger
 * /blog/{id}:
 *   put:
 *     summary: Bir blog yazısını güncelle
 *     description: Verilen id ile bir blog yazısını MongoDB üzerinde günceller.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Güncellenecek blog yazısının id'si.
 *         schema:
 *           type: string
 *       - in: body
 *         name: Blog
 *         description: Güncellenecek blog verileri.
 *         schema:
 *           type: object
 *           required:
 *             - header
 *             - content
 *             - author
 *             - tags
 *           properties:
 *             header:
 *               type: string
 *               example: "Yeni Blog Başlığı"
 *             content:
 *               type: string
 *               example: "Bu blog yazısının içeriği güncellenmiştir."
 *             author:
 *               type: string
 *               example: "Hamit Mızrak"
 *             tags:
 *               type: string
 *               example: "nodejs, mongodb, update"
 *     responses:
 *       200:
 *         description: Güncellenmiş blog verisi döndürülür.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Güncelleme sırasında hata oluştu.
 */
router.put("/:id", async (request, response) => {
  try {
    // MongoDB üzerinden id ile istek attık
    const update = await MongooseBlogModelApi.findByIdAndUpdate(
      // ID almak
      request.params.id,
      request.body,
      { new: true }
    ); //end update

    // Dönüş değeri
    response.status(200).json(update);

    // Güncelleme başarılı
    console.log("Güncelleme Başarılı");
  } catch (err) {
    handleError(
      err,
      response,
      "MongoDB'de Güncelleme Sırasında Hata Meydana geldi"
    );
  } //end catch
}); //end update => put


/////////////////////////////////////////////////////////////////////////////////////////////
// DELETE BLOG
// DELETE isteği ile mongodb üzerinden id ile sileceğiz.
// http://localhost:1111/1

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Bir blog yazısını sil
 *     description: Verilen id ile bir blog yazısını MongoDB üzerinden siler.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Silinecek blog yazısının id'si.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Silme işlemi başarılı olduğunda mesaj döner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "1 nolu id silindi"
 *       400:
 *         description: Silme işlemi sırasında hata oluştu.
 */
router.delete("/:id", async (request, response)=>{
    try {
        // İlgili ID bul
        const id= request.params.id;
        console.log(id);

        const deleteFindId = await MongooseBlogModelApi.findByIdAndDelete(id);
        console.log(deleteFindId);

        // Dönüş değeri
        response.status(200).json({message: `${id} nolu id silindi`})
        
    } catch (error) {
        handleError(
            err,
            response,
            "MongoDB'de Silme Sırasında Hata Meydana geldi"
          );
    }
})

module.exports= router;