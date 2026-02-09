/**
 * TEST RÁPIDO - Generador de Vocabulario Inglés 4º Primaria
 * Ejecutar: node src/services/test-english-vocabulary.js
 */

import { generarVocabulario } from './english-vocabulary-4primaria.js';

console.log('🧪 PROBANDO GENERADOR DE VOCABULARIO INGLÉS 4º PRIMARIA\n');
console.log('='.repeat(60));

// Test 1: Generar 10 preguntas variadas
console.log('\n📝 Generando 10 preguntas variadas...\n');

for (let i = 1; i <= 10; i++) {
    const ejercicio = generarVocabulario('facil', true);

    console.log(`\n${i}. [${ejercicio.subtipo}] ${ejercicio.pregunta}`);
    console.log(`   Opciones: ${ejercicio.opciones.join(' | ')}`);
    console.log(`   ✅ Correcta: ${ejercicio.correcta}`);
    console.log(`   💡 ${ejercicio.explicacion}`);
}

// Test 2: Verificar distribución de tipos
console.log('\n\n' + '='.repeat(60));
console.log('📊 VERIFICANDO DISTRIBUCIÓN DE TIPOS (100 preguntas)...\n');

const conteo = {
    'traduccion_esp_ing': 0,
    'traduccion_ing_esp': 0,
    'identificar_categoria': 0,
    'completar_frase': 0,
    'opuestos': 0
};

for (let i = 0; i < 100; i++) {
    const ejercicio = generarVocabulario('facil', true);
    conteo[ejercicio.subtipo]++;
}

console.log('Resultados:');
Object.entries(conteo).forEach(([tipo, cantidad]) => {
    console.log(`  ${tipo}: ${cantidad}%`);
});

// Test 3: Probar diferentes niveles
console.log('\n\n' + '='.repeat(60));
console.log('🎚️ PROBANDO DIFERENTES NIVELES...\n');

['facil', 'medio', 'dificil'].forEach(nivel => {
    console.log(`\n📌 Nivel: ${nivel.toUpperCase()}`);
    const ejercicio = generarVocabulario(nivel, true);
    console.log(`   ${ejercicio.pregunta}`);
    console.log(`   ✅ ${ejercicio.correcta}`);
});

console.log('\n\n✅ TEST COMPLETADO\n');
