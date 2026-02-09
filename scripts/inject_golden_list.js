import { createClient } from '@supabase/supabase-js';

// CONFIGURACIÓN SUPABASE
const SUPABASE_URL = 'https://kbgkgoxwwlpszyfidufa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_UooTyDkSmTZrlgZjeN6SKA_SZHMIkI1';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// LISTA DORADA DE RECURSOS EDUCATIVOS (Proyecto EDIA / INTEF / Cnice)
// Seleccionados manualmente por calidad y cobertura curricular de 4º Primaria
const GOLDEN_RESOURCES = [
    // --- MATEMÁTICAS ---
    {
        title: "Proyecto cifras: Numeración y operaciones",
        url: "http://ares.cnice.mec.es/matematicas/",
        subject: "Matemáticas",
        topic: "Números y Operaciones",
        grade_level: "4º Primaria",
        description: "Recurso interactivo completo del Ministerio para matemáticas de primaria.",
        source: "INTEF_CNICE",
        content_type: "interactive",
        verified_by_teacher: true
    },
    {
        title: "Retos matemáticos con LEGO (Proyecto EDIA)",
        url: "https://cedec.intef.es/proyecto-edia-matematicas-primaria-lego/",
        subject: "Matemáticas",
        topic: "Geometría y Medida",
        grade_level: "4º Primaria",
        description: "Aprendizaje Basado en Proyectos usando piezas de construcción.",
        source: "INTEF_EDIA",
        content_type: "project_based_learning",
        verified_by_teacher: true
    },
    {
        title: "Fracciones en la vida cotidiana",
        url: "https://procomun.intef.es/ode/view/es_20090630_3_0049405",
        subject: "Matemáticas",
        topic: "Fracciones",
        grade_level: "4º Primaria",
        description: "Unidad didáctica digital sobre el uso de fracciones.",
        source: "INTEF_PROCOMUN",
        content_type: "interactive",
        verified_by_teacher: true
    },

    // --- LENGUA ---
    {
        title: "El tesoro de la lengua",
        url: "http://ares.cnice.mec.es/lengua/",
        subject: "Lengua Castellana",
        topic: "Gramática y Ortografía",
        grade_level: "4º Primaria",
        description: "Portal de recursos lúdicos para el aprendizaje de la lengua.",
        source: "INTEF_CNICE",
        content_type: "interactive",
        verified_by_teacher: true
    },
    {
        title: "Quiéreme con tilde (Acentuación)",
        url: "https://cedec.intef.es/proyecto-edia-primaria-lengua-quiereme-con-tilde/",
        subject: "Lengua Castellana",
        topic: "Ortografía",
        grade_level: "4º Primaria",
        description: "REA para trabajar las reglas de acentuación de forma divertida.",
        source: "INTEF_EDIA",
        content_type: "project_based_learning",
        verified_by_teacher: true
    },

    // --- CIENCIAS NATURALES ---
    {
        title: "Biosfera: La diversidad de la vida",
        url: "http://recursostic.educacion.es/ciencias/biosfera/web/",
        subject: "Ciencias Naturales",
        topic: "Seres Vivos",
        grade_level: "4º Primaria",
        description: "Plataforma clásica de recursos de ciencias naturales.",
        source: "INTEF_BIOSFERA",
        content_type: "interactive",
        verified_by_teacher: true
    },
    {
        title: "El cuerpo humano: máquinas perfectas",
        url: "https://cedec.intef.es/proyecto-edia-primaria-ciencias-naturales-cuerpo-humano/",
        subject: "Ciencias Naturales",
        topic: "Cuerpo Humano",
        grade_level: "4º Primaria",
        description: "Proyecto para investigar el funcionamiento del cuerpo.",
        source: "INTEF_EDIA",
        content_type: "project_based_learning",
        verified_by_teacher: true
    },

    // --- CIENCIAS SOCIALES ---
    {
        title: "Viajeros en el tiempo (Historia)",
        url: "https://cedec.intef.es/proyecto-edia-primaria-ciencias-sociales-viajeros-tiempo/",
        subject: "Ciencias Sociales",
        topic: "Historia",
        grade_level: "4º Primaria",
        description: "REA para abordar la historia a través de líneas de tiempo.",
        source: "INTEF_EDIA",
        content_type: "project_based_learning",
        verified_by_teacher: true
    },
    {
        title: "Atlas Didáctico (Instituto Geográfico Nacional)",
        url: "http://atlasnacional.ign.es/wane/Atlas_Didáctico",
        subject: "Ciencias Sociales",
        topic: "Geografía",
        grade_level: "4º Primaria",
        description: "Mapas interactivos y recursos oficiales del IGN.",
        source: "IGN_OFICIAL",
        content_type: "textbook",
        verified_by_teacher: true
    }
];

async function injectGoldenList() {
    console.log(`✨ Inyectando LISTA DORADA (${GOLDEN_RESOURCES.length} Recursos Premium)...`);

    let savedCount = 0;
    for (const res of GOLDEN_RESOURCES) {
        // Evitar duplicados
        const { data: exists } = await supabase
            .from('resource_library')
            .select('id')
            .eq('url', res.url)
            .maybeSingle();

        if (!exists) {
            const { error } = await supabase.from('resource_library').insert({
                source: res.source,
                title: res.title,
                description: res.description,
                url: res.url,
                subject: res.subject,
                grade_level: res.grade_level,
                topic: res.topic,
                content_type: res.content_type,
                license: 'CC-BY-SA',
                verified_by_teacher: res.verified_by_teacher
            });

            if (error) console.error("❌ Error insertando:", error.message);
            else savedCount++;
        }
    }
    console.log(`✅ ¡Éxito! ${savedCount} nuevos recursos de alta calidad añadidos.`);
}

injectGoldenList();
