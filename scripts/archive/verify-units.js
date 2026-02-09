import { SANTILLANA_LENGUA_4 } from './src/services/khan/santillana-4-primaria-LENGUA.js';

console.log('--- TEMAS DISPONIBLES EN LENGUA (SANTILLANA 4º) ---');
const temas = Object.keys(SANTILLANA_LENGUA_4['Lengua Castellana']);
temas.forEach(t => console.log(`- ${t}`));

if (temas.includes('Unidad 5: Prefijos, Numerales y Adjetivos con V') && temas.includes('Unidad 6: Sufijos, Verbos y Ger/Gir')) {
    console.log('✅ Unidades 5 y 6 preservadas correctamente.');
} else {
    console.log('❌ Error: Faltan unidades 5 o 6.');
}

if (temas.length === 13) { // 12 unidades + 1 repaso
    console.log('✅ Estructura de 12 unidades + repaso confirmada.');
} else {
    console.log(`⚠️ Se encontraron ${temas.length} temas. Se esperaba 13.`);
}
