let listItemsData = [
    {
        id: 1,
        name: "Nintendo Switch Online 12 Months[Physical]",
        price: 2500,
        desc: "Level up with a Nintendo Switch Online + Expansion Pack membership! In addition to all Nintendo Switch Online membership benefits, get access to a library of Nintendo 64™ and Game Boy Advance™ games featuring online play. And a lot more!",
        img: "images/items/NSO 12month.jpeg"
    },
    {
        id: 2,
        name: "Steam $20 Digital Gift Card[Prepaid]",
        price: 2600,
        desc: "This Steam $20 gift card is the ideal gift for your favorite gamer. When you don't know what games they want, or have, just pick up this easy-to-use gift card and let them do the rest. It can be used to buy games, software, hardware or any other item available from the Steam store.",
        img: "images/items/Steam 20dollar.jpeg"
    },
    {
        id: 3,
        name: "Xbox 1 Month Ultimate Game Pass - [Digital]",
        price: 2500,
        desc: "Be the first to play new games like Starfield and Forza Motorsport on day one, so you never miss a thing and enjoy hundreds of high-quality games like Redfall, Hi-Fi RUSH, and more with Xbox Game Pass Ultimate. It includes online multiplayer, so you can play together with friends on console, PC, and cloud, and EA Play, giving you access to top titles on console and PC.",
        img: "images/items/Xbox Gamepass U 1month.jpeg"
    },
    {
        id: 4,
        name: "Playstation Store $25 Gift Card[Physical]",
        price: 3100,
        desc: "Interactive Commicat Playstation $25: Easily add funds to your account for PlayStation™Network without a credit card. Redeem for anything from the largest library of PlayStation® content in the world, including: Games: Virtual currency and add-on Subscriptions and more.",
        img: "images/items/Playstation 25 dollar.jpg"
    },
    {
        id: 5,
        name: "Fortnite Balance Card $30 [Digital]",
        price: 3700,
        desc: "The new Fortnite Gift Card unlocks the opportunity to purchase V-Bucks, Crew, games and more - all powered by the Epic Games Store.",
        img: "images/items/Fortnite 30 dollars.png"
    }
];


let cart = JSON.parse(localStorage.getItem("data")) || [];

const promoCodes = {
    "ostad10": 0.10,
    "ostad50": 0.50
};