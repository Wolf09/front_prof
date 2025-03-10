// ciudades-por-pais.ts
// ciudades-por-pais.ts
export type Pais = string;

export const paises: Pais[] = [
  'Argentina',
  'Bolivia',
  'Brasil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'República Dominicana',
  'Ecuador',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'México',
  'Nicaragua',
  'Panamá',
  'Paraguay',
  'Perú',
  'Uruguay',
  'Venezuela',
  'Estados Unidos',
  'Rusia',
  'China'
];

export const ciudadesPorPais: { [key: string]: string[] } = {
  'Argentina': ['Buenos Aires', 'Cordoba', 'Rosario', 'Mendoza', 'La Plata'],
  'Bolivia': ['La Paz', 'Santa Cruz de la Sierra', 'Cochabamba'],
  'Brasil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  'Chile': ['Santiago', 'Valparaíso', 'Concepción', 'La Serena'],
  'Colombia': ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
  'Costa Rica': ['San José', 'Alajuela', 'Heredia', 'Cartago'],
  'Cuba': ['La Habana', 'Santiago de Cuba', 'Camagüey'],
  'República Dominicana': ['Santo Domingo', 'Santiago', 'La Romana'],
  'Ecuador': ['Quito', 'Guayaquil', 'Cuenca', 'Ambato'],
  'El Salvador': ['San Salvador', 'Santa Ana', 'San Miguel'],
  'Guatemala': ['Ciudad de Guatemala', 'Quetzaltenango'],
  'Honduras': ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba'],
  'México': ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  'Nicaragua': ['Managua', 'León', 'Granada'],
  'Panamá': ['Ciudad de Panamá', 'Colón'],
  'Paraguay': ['Asunción', 'Ciudad del Este'],
  'Perú': ['Lima', 'Arequipa', 'Trujillo', 'Cusco'],
  'Uruguay': ['Montevideo', 'Salto', 'Paysandú'],
  'Venezuela': ['Caracas', 'Maracaibo', 'Valencia'],
  'Estados Unidos': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  'Rusia': ['Moscú', 'San Petersburgo', 'Novosibirsk', 'Ekaterimburgo', 'Kazan'],
  'China': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan']
};
