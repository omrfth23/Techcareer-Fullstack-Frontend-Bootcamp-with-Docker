const { error, log } = require("console");

alert("./public/admin/js/admin.js");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// jQuery dosyaları hazırsa aşağıdaki kodlar çalışacak
$(document).ready(function () {
  const reset = () => {
    // Formu temizlemek
    $("#blog-form-id")[0].reset();
  };
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BLOG LIST
function blogList() {
  $.ajax({
    url: "/blog",
    method: "GET",
    success: function (data) {
      // blogList function içerik listesini temizlemek için
      $("#blog-table-id tbody").empty();

      //forEach
      data.forEach(function (item) {
        $("#blog-table-id tbody").append(`
            <tr data-id="${item._id}">
            <td>${item._id}</td>
            <td>${item.header}</td>
            <td>${item.content}</td>
            <td>${item.author}</td>
            <td>${item.tags}</td>
            <td>${item.views}</td>
            <td>${item.status}</td>
            <td>${item.dataInformation}</td>

            <td>
                <button class="btn btn-primary edit-btn"><i class="fa-solid fa-pen-to-square "></i></button>
                <button class="btn btn-danger delete-btn"><i class="fa-solid fa-trash-can"></i></button>
            </td>

            </tr>
            `); //end append
      }); // end forEach
    }, //end success
  }); //end ajax
} //end blogList

// Function call
blogList();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BLOG ADD
$("#blog-form-id").on("submit", function (event) {
  // Browser otomatik olarak gönder butonu tıklandığında bir şey yapmasın
  event.preventDefault();

  // Blog Form'da verileri almak için
  const blogDataCreate = {
    // Blog Form'da Verileri almak
    header: $("#header").val(),
    content: $("#content").val(),
    author: $("#author").val(),
    tags: $("#tags").val(),
    _csrf: $("input[name='_csrf']").val(), // CSRF token'ı AJAX isteğine dahil et
  }; // end blogDataCreate

  // csrf göster
  console.warn("Sonuç: " + blogDataCreate._csrf);

  // Alınan form versiini kaydetmek(AJAX)
  $.ajax({
    url: "/blog",
    method: "POST",
    data: blogDataCreate,
    success: function (data) {
      // Ekleme istemişten sonra List aktifleştir
      blogList();

      // Formu temizlemek
      $("#blog-form-id")[0].reset();
    }, //end success
    error: function (xhr, status, error) {
      console.error("Blog Ekleme sırasında hata var, ", error); // Hata mesajını göster
    }, //end error
  }); //end ajax
}); // end blog add

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BLOG UPDATE
$("#blog-table-id tbody").on("click", ".edit-btn", function (event) {
  // Browser otomatik olarak gönder butonu tıklandığında bir şey yapmasın
  event.preventDefault();

  // satır ve ilgili id
  const row = $(this).closest("tr");
  const id = row.data("id");

  // Onay Mesajı
  const confirmation = confirm(
    `${id} nolu Blog'u Güncellemek mi, istiyorsunuz ?`
  );

  // Eğer onay EVET
  if (confirmation) {
    const header = row.find("td:eq(1)").text(); // Header ikinci sutun
    const content = row.find("td:eq(2)").text(); // content üçüncü sutun
    const author = row.find("td:eq(3)").text(); // author dördüncü sutun
    const tags = row.find("td:eq(4)").text(); // tags beşinci sutun

    // Formda verilere erişmek
    $("#header").val(header);
    $("#content").val(content);
    $("#author").val(author);
    $("#tags").val(tags);

    $("#blog-form-id")
      .off("submit")
      .on("submit", function (event) {
        // Browser otomatik olarak gönder butonu tıklandığında bir şey yapmasın
        event.preventDefault();

        // Blog Form'da verileri almak için
        const blogDataUpdate = {
          // Blog Form'da Verileri almak
          header: $("#header").val(),
          content: $("#content").val(),
          author: $("#author").val(),
          tags: $("#tags").val(),
        }; // end blogDataUpdate

        // Alınan form versiini kaydetmek(AJAX)
        $.ajax({
          url: `/blog/${id}`,
          method: "PUT",
          data: blogDataUpdate,
          success: function () {
            // Ekleme istemişten sonra List aktifleştir
            blogList();

            // Formu temizlemek
            $("#blog-form-id")[0].reset();
          }, //end success
          error: function (xhr, status, error) {
            console.error("Blog Güncelleme sırasında hata var, ", error); // Hata mesajını göster
          }, //end error
        }); //end ajax
      }); //end submit
  } else {
    console.error(`${id} nolu blog güncelleme`);
    alert(`${id} nolu blog güncelleme`);
  } //end else
}); // end blog update

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BLOG DELETE
$("#blog-table-id tbody").on("click", ".delete-btn", function () {
  // satır ve ilgili id
  const id = $(this).closest("tr").data("id");

  // Onay Mesajı
  const confirmation = confirm(`${id} nolu Blog'u Silmek mi, istiyorsunuz ?`);

  // Eğer onay EVET
  if (confirmation) {
    // Alınan form versiini kaydetmek(AJAX)
    $.ajax({
      url: `/blog/${id}`,
      method: "DELETE",
      success: function () {
        // Ekleme istemişten sonra List aktifleştir
        blogList();

        // Formu temizlemek
        $("#blog-form-id")[0].reset();
      }, //end success
      error: function (xhr, status, error) {
        console.error("Blog silme sırasında hata var, ", error); // Hata mesajını göster
      }, //end error
    }); //end ajax
  } else {
    console.error(`${id} nolu blog silinmedi`);
    alert(`${id} nolu blog silinmedi`);
  } //end else
}); // end blog update
