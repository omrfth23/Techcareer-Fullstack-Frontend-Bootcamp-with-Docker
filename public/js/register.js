$(document).ready(function () {
    // Hata mesajlarını temizleme fonksiyonu
    const clearErrors = () => {
        $(".error-message, .valid-message").remove();
    };

    // Hata mesajı ekleme fonksiyonu
    const showError = (element, message) => {
        $(element).next(".error-message, .valid-message").remove();
        $(element).after(`<small class="text-danger error-message">${message}</small>`);
    };

    // Geçerli mesajı ekleme fonksiyonu
    const showValid = (element, message) => {
        $(element).next(".error-message, .valid-message").remove();
        $(element).after(`<small class="text-success valid-message">${message}</small>`);
    };

    // Form doğrulama fonksiyonu
    const validateForm = () => {
        clearErrors();
        let isValid = true;

        // Username validation
        const username = $("#username").val().trim();
        if (username === "") {
            showError("#username", "Kullanıcı adı boş bırakılamaz!");
            isValid = false;
        } else if (username.length < 3) {
            showError("#username", "Kullanıcı adı en az 3 karakter olmalıdır!");
            isValid = false;
        } else {
            showValid("#username", "Kullanıcı adı geçerli.");
        }

        // Email validation
        const email = $("#email").val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            showError("#email", "Email adresi boş bırakılamaz!");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError("#email", "Geçerli bir email adresi giriniz!");
            isValid = false;
        } else {
            showValid("#email", "Email adresi geçerli.");
        }

        // Password validation
        const password = $("#password").val();
        if (password === "") {
            showError("#password", "Şifre boş bırakılamaz!");
            isValid = false;
        } else if (password.length < 6) {
            showError("#password", "Şifre en az 6 karakter olmalıdır!");
            isValid = false;
        } else {
            showValid("#password", "Şifre geçerli.");
        }

        return isValid;
    };

    // Input alanları için anlık validasyon
    $("#username, #email, #password").on("input", function () {
        const field = $(this);
        const fieldId = field.attr("id");
        const value = field.val().trim();

        if (fieldId === "username") {
            if (value === "") {
                showError(field, "Kullanıcı adı boş bırakılamaz!");
            } else if (value.length < 3) {
                showError(field, "Kullanıcı adı en az 3 karakter olmalıdır!");
            } else {
                showValid(field, "Kullanıcı adı geçerli.");
            }
        } else if (fieldId === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === "") {
                showError(field, "Email adresi boş bırakılamaz!");
            } else if (!emailRegex.test(value)) {
                showError(field, "Geçerli bir email adresi giriniz!");
            } else {
                showValid(field, "Email adresi geçerli.");
            }
        } else if (fieldId === "password") {
            if (value === "") {
                showError(field, "Şifre boş bırakılamaz!");
            } else if (value.length < 6) {
                showError(field, "Şifre en az 6 karakter olmalıdır!");
            } else {
                showValid(field, "Şifre geçerli.");
            }
        }
    });

    // Formu sıfırlama fonksiyonu
    const resetForm = () => {
        $("#register-form")[0].reset();
        clearErrors();
    };

    // Kullanıcı listesini getir
    const fetchUserList = () => {
        $.ajax({
            url: "/register/api",
            method: "GET",
            success: function (data) {
                const $tbody = $("#user-table tbody").empty();
                data.forEach(user => {
                    // Tarihi formatla
                    const date = user.createdAt ? new Date(user.createdAt) : new Date();
                    const formattedDate = date.toLocaleString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    $tbody.append(`
                        <tr data-id="${user._id}">
                            <td>${user._id}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${formattedDate}</td>
                            <td>
                                <button class="btn btn-danger delete-btn">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: handleError
        });
    };

    // Hata yönetimi fonksiyonu
    const handleError = (xhr, status, error) => {
        console.error("İşlem başarısız:", error);
        Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Beklenmeyen bir hata oluştu, lütfen tekrar deneyin.',
            confirmButtonColor: '#e74a3b'
        });
    };

    // Başarı bildirimi fonksiyonu
    const showSuccess = (message) => {
        Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: message,
            confirmButtonColor: '#4e73df',
            timer: 2000,
            timerProgressBar: true
        });
    };

    // Silme onayı fonksiyonu
    const confirmDelete = () => {
        return Swal.fire({
            title: 'Emin misiniz?',
            text: "Bu kullanıcıyı silmek istediğinizden emin misiniz?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74a3b',
            cancelButtonColor: '#858796',
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: 'İptal'
        });
    };

    // Form gönderme işlemini güncelle
    $("#register-form").on("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const userData = {
            username: $("#username").val().trim(),
            email: $("#email").val().trim(),
            password: $("#password").val(),
            _csrf: $("input[name='_csrf']").val()
        };

        $.ajax({
            url: "/register/api",
            method: "POST",
            data: userData,
            success: function (response) {
                showSuccess('Kayıt başarıyla tamamlandı!');
                $("#register-form")[0].reset();
                clearErrors();
                fetchUserList();
            },
            error: function (xhr, status, error) {
                if (xhr.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Kayıt Başarısız!',
                        text: 'Bu email adresi zaten kayıtlı!',
                        confirmButtonColor: '#e74a3b'
                    });
                } else {
                    handleError(xhr, status, error);
                }
            }
        });
    });

    // Kullanıcı silme işlemini güncelle
    $("#user-table tbody").on("click", ".delete-btn", function () {
        const row = $(this).closest("tr");
        const id = row.data("id");

        confirmDelete().then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/register/api/${id}`,
                    method: "DELETE",
                    data: { _csrf: $("input[name='_csrf']").val() },
                    success: function () {
                        row.remove();
                        Swal.fire({
                            icon: 'success',
                            title: 'Silindi!',
                            text: 'Kullanıcı başarıyla silindi.',
                            confirmButtonColor: '#4e73df',
                            timer: 2000,
                            timerProgressBar: true
                        });
                    },
                    error: handleError
                });
            }
        });
    });

    // Sayfa yüklendiğinde kullanıcı listesini getir
    fetchUserList();
});
