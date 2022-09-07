const Restaurant = require("../models/restaurantModel")

const restaurantSeed = async () => {
    const restaurant = await Restaurant.findOne({})

    const restaurants = [
        {
            name: 'KFC',
            category: ['Fast food', 'Chicken', 'Burgers'],
            img: 'kfc.jpg',
        },
        {
            name: 'McDonald',
            category: ['Fast food', 'Burgers'],
            img: 'mcdonald.jpg',
        },
        {
            name: 'Hesburger',
            category: ['Fast food', 'Burgers'],
            img: 'hesburger.jpg',
        },
        {
            name: 'KINGU',
            category: ['Fast food', 'Burgers', 'Chicken', 'Kebab'],
            img: 'kingu.jpg',
        },
        {
            name: 'Street Food',
            category: ['Fast food', 'Burgers', 'Kebab', 'Pizza'],
            img: 'streetfood.jpg',
        },
        {
            name: 'Circle K',
            category: ['Fast food', 'Burgers', 'Hotdog', 'Wraps'],
            img: 'circlek.jpg',
        },
        {
            name: 'Ghetto Pietura',
            category: ['Fast food', 'Burgers'],
            img: 'ghettopietura.jpg',
        },
        {
            name: 'Narvesen',
            category: ['Fast food', 'Burgers', 'Hotdog', 'Wraps'],
            img: 'narvesen.jpg',
        },
        {
            name: 'Ezītis Miglā',
            category: ['Burgers', 'Soup', 'Chicken', 'Salad', 'Pasta'],
            img: 'ezitismigla.jpg',
        },
        {
            name: 'Late Night Munchies',
            category: ['Fast food', 'Burgers', 'Pizza'],
            img: 'latenightmunchies.jpg',
        },
        {
            name: 'OAK Burgers',
            category: ['Fast food', 'Burgers', 'Salad'],
            img: 'oakburgers.jpg',
        },
        {
            name: 'Fat Popo',
            category: ['Fast food', 'Burgers'],
            img: 'fatpopo.jpg',
        },
        {
            name: 'Street Burgers',
            category: ['Fast food', 'Burgers'],
            img: 'streetburgers.jpg',
        },
        {
            name: 'Doner King',
            category: ['Fast food', 'Kebab'],
            img: 'donerking.jpg',
        },
        {
            name: 'Hasana',
            category: ['Fast food', 'Kebab'],
            img: 'hasana.jpg',
        },
        {
            name: 'Kebab House',
            category: ['Fast food', 'Kebab'],
            img: 'kebabhouse.jpg',
        },
        {
            name: 'Ausmeņa Kebabs',
            category: ['Fast food', 'Kebab'],
            img: 'ausmenakebabs.jpg',
        },
        {
            name: 'Rīgas Kebabs',
            category: ['Fast food', 'Kebab'],
            img: 'rigaskebabs.jpg',
        },
        {
            name: 'Lazy Cats',
            category: ['Fast food', 'Kebab'],
            img: 'lazycats.jpg',
        },
        {
            name: 'Befrites',
            category: ['Fast food', 'Kebab'],
            img: 'befrites.jpg',
        },
        {
            name: 'Foodbox',
            category: ['Fast food', 'Kebab'],
            img: 'foodbox.jpg',
        },
        {
            name: 'Garšeigs kebabs JUGLĀ',
            category: ['Fast food', 'Kebab'],
            img: 'jugla.jpg',
        },
        {
            name: 'Pepperoni Pizza',
            category: ['Fast food', 'Pizza'],
            img: 'pepperonipizza.jpg',
        },
        {
            name: 'Vairāk Saules',
            category: ['Pizza', 'Burgers', 'Salad', 'Soup', 'Pasta', 'Chicken'],
            img: 'vairaksaules.jpg',
        },
        {
            name: 'Pizza Italia',
            category: ['Fast food', 'Pizza'],
            img: 'pizzaitalia.jpg',
        },
        {
            name: 'Pica Lulū',
            category: ['Fast food', 'Pizza'],
            img: 'picalulu.jpg',
        },
        {
            name: 'Picu Darbnīca',
            category: ['Fast food', 'Pizza'],
            img: 'picudarbnica.jpg',
        },
        {
            name: 'Mārtiņa Pica',
            category: ['Fast food', 'Pizza'],
            img: 'martinapica.jpg',
        },
        {
            name: 'Čilli Pica',
            category: ['Fast food', 'Pizza', 'Soup', 'Salad'],
            img: 'cillipica.jpg',
        },
        {
            name: 'Naples',
            category: ['Pizza', 'Soup', 'Salad', 'Pasta'],
            img: 'naples.jpg',
        },
        {
            name: 'Bērzi Pannā',
            category: ['Salad', 'Soup', 'Pasta', 'Karbonades'],
            img: 'berzipanna.jpg',
        },
        {
            name: 'Lokāls Karbonādes',
            category: ['Salad', 'Chicken', 'Karbonades'],
            img: 'lokalskarbonades.jpg',
        },
        {
            name: 'Mr.Bobs',
            category: ['Salad', 'Soup', 'Karbonades'],
            img: 'mrbobs.jpg',
        },
        {
            name: 'Cafe Leningrad',
            category: ['Salad', 'Soup', 'Pasta', 'Karbonades'],
            img: 'cafeleningrad.jpg',
        },
        {
            name: 'Mazā Terapija',
            category: ['Salad', 'Soup', 'Pasta', 'Karbonades'],
            img: 'mazaterapija.jpg',
        },
        {
            name: 'Lauvas nams',
            category: ['Salad', 'Soup', 'Pasta', 'Karbonades'],
            img: 'lauvasnams.jpg',
        },
        {
            name: 'Lido',
            category: ['Salad', 'Soup', 'Pasta', 'Karbonades'],
            img: 'lido.jpg',
        },
    ]

    if (!restaurant) {
        restaurants.map(({ name, category, img }) => {
            const newRestaurant = new Restaurant({
                name,
                category,
                img
            })

            newRestaurant.save()
        })
    }
}

module.exports = restaurantSeed