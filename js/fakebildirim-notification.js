var startTimer = 3000;
var ShowTimer = 7000;
var IntervalTimer= 219000;
var Rondomkey = "random";
var atOptions = [
    {
        "head": "5 dakika önce",
        "message": "Samsun'dan bir müşteri Instagram 5000 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Diyarbakır'dan bir müşteri Instagram 250 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Kastamonu'dan bir müşteri Twitter 1000 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "İstanbul'dan bir müşteri Twitter 500 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Konya'dan bir müşteri Instagram 100 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Van'dan bir müşteri Instagram 500 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Malatya'dan bir müşteri Instagram 500 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Malatya'dan bir müşteri Instagram 25000 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Erzurum'dan bir müşteri Instagram 250 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Bilecik'ten bir müşteri Instagram 25000 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Ordu'dan bir müşteri WhatsApp 250 Türk Üye paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Hatay'dan bir müşteri Facebook 5.000 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Sinop'tan bir müşteri Twitter 750 Gerçek Türk Retweet paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Erzurum'dan bir müşteri Instagram 5.000 İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Muğla'dan bir müşteri Twitch 2.000 İzlenme  paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Sakarya'dan bir müşteri TikTok 750 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Hatay'dan bir müşteri Instagram 1.500 Türk Kaliteli Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Bilecik'ten bir müşteri Instagram 75.000 Takipçili Hesap paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Samsun'dan bir müşteri Spotify 2.000 Ücretsiz Dinlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Van'dan bir müşteri Twitter 2.000 Türk Beğeni paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Malatya'dan bir müşteri Facebook 2.500 Sayfa Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Kocaeli'den bir müşteri Instagram 7.500 Türk Beğeni paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Hatay'dan bir müşteri Instagram 10.000 Takipçili Hesap paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Konya'dan bir müşteri Instagram 75.000 Takipçili Hesap paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Ordu'dan bir müşteri Instagram 2.000 Çekilişle Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Konya'dan bir müşteri Instagram 5.000 Otomatik İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Muğla'dan bir müşteri Twitter 50.000 Görüntülenme paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Hatay'dan bir müşteri Instagram 5.000 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Malatya'dan bir müşteri Twitter 2.500 Video İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Karabük'ten bir müşteri Instagram 2.000 Gerçek Kadın Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Ordu'dan bir müşteri Instagram 1.00.000 Video İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Kastamonu'dan bir müşteri Instagram 250 Organik Yabancı Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Erzurum'dan bir müşteri Instagram 10.000 Otomatik Hikaye İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Diyarbakır'dan bir müşteri Instagram 500 Garantili Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Eskişehir'den bir müşteri Spotify 500 Kaydet paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Muğla'dan bir müşteri TikTok 10.000 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Ordu'dan bir müşteri Twitch 500 Türk Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Trabzon'dan bir müşteri Instagram 250 Otomatik Beğeni paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Konya'dan bir müşteri Facebook 250 Kişi 120 Dakika Canlı Yayın İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "İzmir'den bir müşteri Reddit 20.000 İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Erzurum'dan bir müşteri Instagram 50.000 Türk Beğeni paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Kocaeli'den bir müşteri Snapchat  500 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Diyarbakır'dan bir müşteri Reddit 250 Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Kocaeli'den bir müşteri Instagram 500 Organik Kadın Takipçi paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "İzmir'den bir müşteri Discord 250 Offline Üye paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Malatya'dan bir müşteri Twitter 500 Organik Türk Beğeni paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Sakarya'dan bir müşteri Facebook 1.000 Sayfa Beğenisi paketi için sipariş oluşturdu."
    },
    {
        "head": "1 Yeni Bildirim",
        "message": "Kocaeli'den bir müşteri Twitter 10.000 Retweet paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Mersin'den bir müşteri Instagram 20.000 Video İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "Yeni Sipariş",
        "message": "Konya'dan bir müşteri YouTube 250 İzlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "5 dakika önce",
        "message": "Hatay'dan bir müşteri Spotify 50.000 Ücretsiz Dinlenme paketi için sipariş oluşturdu."
    },
    {
        "head": "3 dakika önce",
        "message": "Eskişehir'den bir müşteri TikTok 20.000 Takipçi paketi için sipariş oluşturdu."
    }
];