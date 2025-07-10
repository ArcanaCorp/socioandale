export const bussinesList = [
    {
        id: 1,
        txt: 'Agencia de Turismo',
        key: 'agency'
    },
    {
        id: 2,
        txt: 'Restaurante',
        key: 'restaurant'
    },
    {
        id: 3,
        txt: 'Hotel',
        key: 'hotel'
    },
    {
        id: 4,
        txt: 'Transporte',
        key: 'transport'
    }
];

export const typesBuss = {
    agency: [
        { name: "Tours guiados", slug: "tours-guiados" },
        { name: "Turismo vivencial", slug: "turismo-vivencial" },
        { name: "Alquiler de bicicletas", slug: "alquiler-bicicletas" },
        { name: "Senderismo y trekking", slug: "senderismo" }
    ],
    restaurant: [
        { name: "Pollería", slug: "polleria" },
        { name: "Cevichería", slug: "cevicheria" },
        { name: "Comida criolla", slug: "comida-criolla" },
        { name: "Cafetería", slug: "cafeteria" },
        { name: "Pizzería", slug: "pizzeria" },
        { name: "Eco-Restaurante", slug: "ecorestaurant" }
    ],
    hotel: [
        { name: "Hotel 3 estrellas", slug: "hotel-3-estrellas" },
        { name: "Hostal", slug: "hostal" },
        { name: "Hospedaje familiar", slug: "hospedaje-familiar" },
        { name: "Lodge rural", slug: "lodge-rural" }
    ],
    transport: [
        { name: "Taxi local", slug: "taxi-local" },
        { name: "Movilidad turística", slug: "movilidad-turistica" },
        { name: "Alquiler de autos", slug: "alquiler-autos" },
        { name: "Transporte interprovincial", slug: "transporte-interprovincial" }
    ]
};

export const servicesBuss = {
    agency: [
        { id: 'tour-guide', service: 'Guía Turístico' },
        { id: 'city-tours', service: 'City Tours' },
        { id: 'adventure-trips', service: 'Turismo de Aventura' },
        { id: 'custom-packages', service: 'Paquetes Personalizados' },
        { id: 'ticket-reservation', service: 'Reserva de Tickets' },
        { id: 'event-organization', service: 'Organización de Eventos' }
    ],
    restaurant: [
        { id: 'delivery', service: 'Delivery' },
        { id: 'take-away', service: 'Para Llevar' },
        { id: 'table-service', service: 'Atención en Mesa' },
        { id: 'menu-of-day', service: 'Menú del Día' },
        { id: 'catering', service: 'Servicio de Catering' },
        { id: 'reservations', service: 'Reservas de Mesa' }
    ],
    transport: [
        { id: 'taxi-service', service: 'Servicio de Taxi' },
        { id: 'moto-taxi', service: 'Moto Taxi' },
        { id: 'airport-transfer', service: 'Traslado al Aeropuerto' },
        { id: 'tourist-transport', service: 'Transporte Turístico' },
        { id: 'package-delivery', service: 'Reparto de Paquetes' },
        { id: 'private-driver', service: 'Chofer Privado' }
    ],
    hotel: [
        { id: 'room-booking', service: 'Reserva de Habitaciones' },
        { id: 'wifi-service', service: 'Wi-Fi Gratuito' },
        { id: 'breakfast-included', service: 'Desayuno Incluido' },
        { id: 'pet-friendly', service: 'Pet Friendly' },
        { id: 'room-service', service: 'Servicio a la Habitación' },
        { id: 'tour-coordination', service: 'Coordinación de Tours' }
    ]
};