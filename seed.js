import mongoose from 'mongoose';
import { connectDB } from './src/config/db.js';
import Category from './src/models/categoryModel.js';
import Product from './src/models/productModel.js';
import User from './src/models/userModel.js';

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log('Conectado a la base de datos');

        // Limpiar colecciones
        await Category.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('Colecciones limpiadas');

        // Crear categorías
        const categories = [
            { nombre: 'filtros y aceites', descripcion: 'Aceites lubricantes y filtros para motor' },
            { nombre: 'encendido', descripcion: 'Baterías, bujías y sistema de encendido' },
            { nombre: 'suspensión y frenos', descripcion: 'Pastillas, discos, amortiguadores y componentes de suspensión' },
            { nombre: 'luminaria', descripcion: 'Luces LED, halógenas y sistemas de iluminación' }
        ];

        const createdCategories = await Category.insertMany(categories);
        console.log(createdCategories.length + ' categorías creadas');

        // Mapear categorías por nombre para facilitar la asignación
        const catMap = {
            'filtros y aceites': createdCategories[0]._id,
            'encendido': createdCategories[1]._id,
            'suspensión y frenos': createdCategories[2]._id,
            'luminaria': createdCategories[3]._id
        };

        // Crear productos
        const products = [
            // Aceites
            {
                titulo: "Liqui Moly 0W-20 Molygen New Generation 4L",
                precio: 85400,
                categoria: catMap['filtros y aceites'],
                imagen: "https://liqui-moly.com.ar/wp-content/uploads/2022/03/molygen-0w-20.jpg",
                stock: 20,
                descripcion: "Ideal para motores gasolina modernos del mercado asiáticos y americano con tecnología multiválvulas, con turbocompresión y con y sin refrigeración del aire de admisión (LLK). Para proteger el motor y mantener su valor en caso de intervalos de cambio de aceite prolongados y altos requerimientos."
            },
            {
                titulo: "Liqui Moly 5W-30 Molygen New Generation 4L.",
                precio: 79400,
                categoria: catMap['filtros y aceites'],
                imagen: "https://liqui-moly.com.ar/wp-content/uploads/2022/03/molygen-5w-30.jpg",
                stock: 20,
                descripcion: "Para motores de gasolina y diésel, incluyendo la tecnología common rail. Particularmente indicado para vehículos con filtro de partículas diésel (DPF), también en caso de equipamiento posterior. Probado en turbocompresores y catalizadores."
            },
            {
                titulo: "Liqui Moly 10W-40 High Tech - Super Leichtlauf 4L",
                precio: 75800,
                categoria: catMap['filtros y aceites'],
                imagen: "https://liqui-moly.com.ar/wp-content/uploads/2016/01/10w40.jpg",
                stock: 20,
                descripcion: "Ideal para modernos motores nafteros, a Diesel y motores turbo. Muy apropiado para intervalos de cambio de aceite extendidos y altas exigencias a los motores."
            },
            // Baterías
            {
                titulo: "Batería Mateo 12x60",
                precio: 156000,
                categoria: catMap['encendido'],
                imagen: "https://rallycarcenter.com.ar/wp-content/uploads/2024/08/D_NQ_NP_762272-MLA52778719037_122022-O-300x300.webp",
                stock: 15,
                descripcion: "Alta durabilidad y resistencia a descargas profundas, ideal para climas extremos."
            },
            {
                titulo: "Batería Mateo 12x90",
                precio: 179900,
                categoria: catMap['encendido'],
                imagen: "https://tienda.waltergarcia.com.ar/wp-content/uploads/2024/01/Bateria-Mateo-12x90-1.webp",
                stock: 8,
                descripcion: "Modelo de alto rendimiento, especial para vehículos con alto consumo eléctrico."
            },
            // Filtros
            {
                titulo: "Filtro de Aceite Chevrolet Cruze 2013/.. 2.0 VCDI",
                precio: 31400,
                categoria: catMap['filtros y aceites'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_953440-MLA76091555728_052024-F.webp",
                stock: 30,
                descripcion: "Modelo: OX1012D. Numero de pieza: 93745801. Altura: 126. Diam. Ext: 66. Diam. Encastre: 25."
            },
            {
                titulo: "Filtro de Aceite Audi A3 1.4 1.6 Alemán",
                precio: 15300,
                categoria: catMap['filtros y aceites'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_967406-MLA77890904918_082024-F.webp",
                stock: 20,
                descripcion: "Modelo: VW Audi. Numero de pieza: 03C-115562-A. Altura x Ancho: 59mm x 65mm."
            },
            {
                titulo: "Filtro de Aceite VW Bora, Golf 1.8 T 2.0 Nafta.",
                precio: 19500,
                categoria: catMap['filtros y aceites'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_716439-MLA69595058091_052023-F.webp",
                stock: 10,
                descripcion: "Modelo: L6A-115-561-B. Numero de pieza: L6A-115-561-B. Altura x ancho: 10mm x 10mm."
            },
            // Pastillas y amortiguadores
            {
                titulo: "Pastillas de freno Corven VW Gol Trend 1.6 08/11",
                precio: 54700,
                categoria: catMap['suspensión y frenos'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_958340-MLA75932486049_042024-F.webp",
                stock: 10,
                descripcion: "Cantidad de pastillas: 4. Posición: Delantera/trasera. Modelo: 1039 3PF4017 1039. Numero de pieza: 3PF4017 1039"
            },
            {
                titulo: "Pastillas de freno Corven VW Vento 2.0 TDI / 2.0 TFSI",
                precio: 141600,
                categoria: catMap['suspensión y frenos'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_959005-MLA30168272753_042019-F.webp",
                stock: 12,
                descripcion: "Cantidad de pastillas: 4. Posición: delantera. Modelo: 3222. Numero de pieza: 3PF1004."
            },
            {
                titulo: "Pastillas de freno Corven Audi A3 3.2 8p1 2003/2012",
                precio: 188900,
                categoria: catMap['suspensión y frenos'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_901245-MLA82195716671_012025-F.webp",
                stock: 8,
                descripcion: "Cantidad de pastillas: 8. Posición: Delantera/trasera. Modelo: 3229 3219. Numero de pieza: 3229 3219."
            },
            {
                titulo: "Kit Amortiguadores Corven VW Bora",
                precio: 188900,
                categoria: catMap['suspensión y frenos'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_779437-MLA30911941628_052019-F.webp",
                stock: 8,
                descripcion: "Numero de pieza: 42101G. Posición: Trasero. Lado: Izq/Der."
            },
            {
                titulo: "Kit Armotiguadores Corven Plus Audi A4",
                precio: 604800,
                categoria: catMap['suspensión y frenos'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_826285-MLA31021396583_062019-F.webp",
                stock: 8,
                descripcion: "Numero de pieza: 34636G+42637G. Posición: Delantero. Lado: Izq/Der."
            },
            {
                titulo: "Kit Amortiguadores Corven Plus Ford Focus",
                precio: 362600,
                categoria: catMap['suspensión y frenos'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_779437-MLA30911941628_052019-F.webp",
                stock: 8,
                descripcion: "Numero de pieza: 42847G+35845G@35846G. Posición: Delantero. Lado: Izq/Der."
            },
            // Bujías
            {
                titulo: "Bujía NGK BKUR5ETC-10 x4",
                precio: 34700,
                categoria: catMap['encendido'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_739809-MLA74506692896_022024-F.webp",
                stock: 40,
                descripcion: "VOLKSWAGEN: Crossfox, Fox, Audi A3."
            },
            {
                titulo: "Bujía NGK TR6B10 x4",
                precio: 31700,
                categoria: catMap['encendido'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_877078-MLA47203117731_082021-O.webp",
                stock: 20,
                descripcion: "FORD: Ecosport, Fiesta."
            },
            {
                titulo: "Bujía NGK BPR5EY x4",
                precio: 18200,
                categoria: catMap['encendido'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_802146-MLA41716943190_052020-F.webp",
                stock: 20,
                descripcion: "VOLKSWAGEN: Gol, Passat. CHEVROLET: Agile, Astra. FIAT: Duna, Tipo."
            },
            {
                titulo: "Bujía NGK BKUR6ET-10 x4",
                precio: 43500,
                categoria: catMap['encendido'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_755318-MLA78155714197_082024-O.webp",
                stock: 20,
                descripcion: "VOLKSWAGEN: Bora, Caddy. AUDI: A3, A4."
            },
            {
                titulo: "Bujía NGK LFR6B x4",
                precio: 24600,
                categoria: catMap['encendido'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_834960-MLA79340680376_092024-F.webp",
                stock: 20,
                descripcion: "CITROEN: C3, C4. PEUGEOT: 206, 308."
            },
            {
                titulo: "Bujía NGK BKR6EGP x4",
                precio: 33400,
                categoria: catMap['encendido'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_687655-MLA40999561937_032020-F.webp",
                stock: 20,
                descripcion: "VOLKSWAGEN: Bora. CHEVROLET: Corsa, Meriva, Vectra. FIAT: Mobi, Siena, Uno."
            },
            // Luminaria
            {
                titulo: "LAMPARA HALOGENA. H4 12v 60/55 KOBO",
                precio: 5400,
                categoria: catMap['luminaria'],
                imagen: "https://www.micolini.com/mods/html/fil/Model/Product/20991/thumb_03_241-12342KO.jpg.webp",
                stock: 20,
                descripcion: "Cod. 241-12342KO."
            },
            {
                titulo: "LAMPARA HALOGENA H7 12v 55w KOBO",
                precio: 11500,
                categoria: catMap['luminaria'],
                imagen: "https://www.micolini.com/mods/html/fil/Model/Product/20992/thumb_03_6250292908da5-h7-3.jpg.webp",
                stock: 20,
                descripcion: "Cod. 241-12972KO."
            },
            {
                titulo: "LAMPARA HALOGENA H11 24v 55w KOBO",
                precio: 13500,
                categoria: catMap['luminaria'],
                imagen: "https://www.micolini.com/mods/html/fil/Model/Product/21038/thumb_03_241-13362KO.jpg.webp",
                stock: 20,
                descripcion: "Cod. 241-13362KO."
            },
            {
                titulo: "KIT CREE LED H1",
                precio: 22000,
                categoria: catMap['luminaria'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_719339-MLA76178556956_052024-F.webp",
                stock: 20,
                descripcion: "S6 Plus HS Original 6500k."
            },
            {
                titulo: "KIT CREE LED H7",
                precio: 22000,
                categoria: catMap['luminaria'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_719339-MLA76178556956_052024-F.webp",
                stock: 20,
                descripcion: "S6 Plus HS Original 6500k."
            },
            {
                titulo: "KIT CREE LED H11",
                precio: 22000,
                categoria: catMap['luminaria'],
                imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_719339-MLA76178556956_052024-F.webp",
                stock: 20,
                descripcion: "S6 Plus HS Original 6500k."
            }
        ];

        const createdProducts = await Product.insertMany(products);
        console.log(createdProducts.length + ' productos creados');

        // Crear usuario de prueba
        const adminUser = new User({
            nombre: 'admin',
            email: 'admin@tiendarepuestos.com',
            contraseña: '123456',
            rol: 'admin'
        });
        await adminUser.save();
        console.log('Usuario administrador creado (admin@tiendarepuestos.com / 123456)');


        // Crear usuario cliente de prueba
        const clientUser = new User({
            nombre: 'cliente test',
            email: 'cliente@email.com',
            contraseña: '123456',
            rol: 'cliente'
        });
        await clientUser.save();
        console.log('Usuario cliente creado (cliente@email.com / 123456)');


        console.log('\nBase de datos poblada exitosamente');
        console.log('Categorías: ' + createdCategories.length);
        console.log('Productos: ' + createdProducts.length);
        console.log('Usuarios: 2 (1 admin + 1 cliente)');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
};

seedDatabase();