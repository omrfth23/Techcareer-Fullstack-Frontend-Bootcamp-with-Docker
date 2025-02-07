// MongoDB için veritabanı işlemlerinde kullanmak üzere `MongoRegisterModel` adında model oluşturalım.
// Mongoose adında ki kütüphaneyi ekle ve bu kütüphaneye erişmek için `mongoose` adını kullan.
// mongoose paketini sisteme dahil ediyoruz.
// Mongoose MongoDB ile bağlantı kurarken sağlıklı ve hızlı bağlantısı için  bir ODM(Object Data Modeling)
// NOT: Eğer bu sayfada Typescript kullansaydım reqire yerine import kullanacaktım.
// Import
const mongoose = require("mongoose");

// Schema adından (BlogPostSchema)
const BlogRegisterSchema = new mongoose.Schema({
        // 1.YOL (USERNAME)
        username: {
            type: String,
            required: [true, "Username alanı gereklidir"],
            trim: true,
            minlength: [3, "Username en az 3 karakter olmalıdır."],
            maxlength: [50, "Username en fazla 50 karakter olmalıdır."],
        },

        // PASSWORD
        password: {
            type: String,
            required: [true, "Şifre alanı gereklidir"],
            trim: true,
            minlength: [6, "Şifre en az 6 karakter olmalıdır."],
        },

        // EMAIL
        email: {
            type: String,
            required: [true, "Email alanı gereklidir"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Geçerli bir email adresi giriniz'],
        }
    }, 
    {
        // Bu seçenek otomatik olarak createdAt ve updatedAt alanlarını ekler
        timestamps: true
    }
);

////////////////////////////////////////////////////////////////////
// Sanal alan (Virtuals) - İçerik özetini döndürme
// summary: Blog içeriğinin ilk 100 karakterini döndüren bir sanal alan ekledik.
// Bu, API cevaplarında sadece kısa bir özet göstermek için kullanılabilir.
BlogRegisterSchema.virtual("summary").get(function () {
    return this.content.substring(0, 100) + "..."; // İlk 100 karakter ve ardından ...
});

// Şema için ön middleware - Kullanıcı adını düzenleme
BlogRegisterSchema.pre("save", function (next) {
    // Username'in ilk harfini büyük yap
    if (this.username) {
        this.username = this.username.charAt(0).toUpperCase() + this.username.slice(1).toLowerCase();
    }
    next();
});

// Statik metot - Belirli bir yazara ait tüm blogları bulma
// Statik Metot: findByAuthor: Belirli bir yazara ait tüm blog gönderilerini bulmak için statik bir metot ekledik. Bu, belirli yazara göre blog filtrelemek için kullanılabilir.
BlogRegisterSchema.statics.findByAuthor = function (authorName) {
    return this.find({author: authorName});
};

// Instance metodu - Görüntüleme sayısını artırma
// Instance Metot: incrementViews: Her blog gönderisine ait görüntüleme sayısını artırmak için bir instance metot ekledik. Bu, bir gönderi görüntülendiğinde görüntüleme sayısını artırmanızı sağlar.
BlogRegisterSchema.methods.incrementViews = function () {
    this.views += 1;
    return this.save();
};

// Instance metodu - Kullanıcı bilgilerini güvenli şekilde döndürme
BlogRegisterSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password; // Şifreyi JSON çıktısından kaldır
    return user;
};

// Sanal alanların JSON'a dahil edilmesi
BlogRegisterSchema.set("toJSON", {virtuals: true});

// Module Exports modelName(BlogModel)
// BlogModel modelini dışa aktarmak
// Post kullanımı daha yaygındır
// module.exports = mongoose.model('Post', BlogRegisterSchema );

// Module
// 1.YOL
// module.exports = mongoose.model("MongoBlogModel", BlogRegisterSchema);

// 2.YOL
const RegisterModel = mongoose.model("Register", BlogRegisterSchema);
module.exports = RegisterModel;
