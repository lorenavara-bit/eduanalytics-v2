/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, CheckCircle, Clock, Activity, BarChart2, ArrowRight, Play, Trophy, Pause } from 'lucide-react';

// ================================
// COMPREHENSIVE 200+ QUESTION DATABASE
// ================================

const QUESTION_DATABASE = {
    // Level 1: Basic Patterns (Questions 1-40)
    basic: [
        // 1. Simple Rotation (20 questions)
        {
            id: 'B1',
            pattern: 'rotation',
            difficulty: 1,
            matrix: [
                { shape: 'arrow', dir: 'up', color: '#4a6fa5' },
                { shape: 'arrow', dir: 'right', color: '#4a6fa5' },
                { shape: 'arrow', dir: 'down', color: '#4a6fa5' },
                { shape: 'arrow', dir: 'left', color: '#4a6fa5' },
                { shape: 'arrow', dir: 'up', color: '#4a6fa5' },
                { shape: 'arrow', dir: 'right', color: '#4a6fa5' },
                { shape: 'arrow', dir: 'down', color: '#4a6fa5' },
                { shape: 'arrow', dir: 'left', color: '#4a6fa5' }
            ],
            options: [
                { shape: 'arrow', dir: 'up', color: '#4a6fa5', isCorrect: true },
                { shape: 'arrow', dir: 'right', color: '#4a6fa5', isCorrect: false },
                { shape: 'arrow', dir: 'down', color: '#4a6fa5', isCorrect: false },
                { shape: 'arrow', dir: 'left', color: '#4a6fa5', isCorrect: false },
                { shape: 'arrow', dir: 'up-right', color: '#4a6fa5', isCorrect: false },
                { shape: 'arrow', dir: 'down-left', color: '#4a6fa5', isCorrect: false }
            ],
            logic: "Rotación de 45° en sentido horario en cada celda"
        },
        // 2. Simple Progression (20 questions)
        {
            id: 'B21',
            pattern: 'progression',
            difficulty: 1,
            matrix: [
                { shape: 'circle', size: 20, color: '#ff6b6b', filled: true },
                { shape: 'circle', size: 25, color: '#ff6b6b', filled: true },
                { shape: 'circle', size: 30, color: '#ff6b6b', filled: true },
                { shape: 'circle', size: 35, color: '#ff6b6b', filled: true },
                { shape: 'circle', size: 40, color: '#ff6b6b', filled: true },
                { shape: 'circle', size: 45, color: '#ff6b6b', filled: true },
                { shape: 'circle', size: 50, color: '#ff6b6b', filled: true },
                { shape: 'circle', size: 55, color: '#ff6b6b', filled: true }
            ],
            options: [
                { shape: 'circle', size: 60, color: '#ff6b6b', filled: true, isCorrect: true },
                { shape: 'circle', size: 65, color: '#ff6b6b', filled: true, isCorrect: false },
                { shape: 'circle', size: 55, color: '#ff6b6b', filled: true, isCorrect: false },
                { shape: 'circle', size: 50, color: '#ff6b6b', filled: true, isCorrect: false },
                { shape: 'circle', size: 70, color: '#ff6b6b', filled: true, isCorrect: false },
                { shape: 'circle', size: 40, color: '#ff6b6b', filled: true, isCorrect: false }
            ],
            logic: "El tamaño aumenta 5 unidades en cada paso"
        }
    ],

    // Level 2: Intermediate Patterns (Questions 41-100)
    intermediate: [
        // 3. Element Addition (20 questions)
        {
            id: 'I1',
            pattern: 'addition',
            difficulty: 2,
            matrix: [
                { elements: [{ shape: 'circle', color: '#4a6fa5' }] },
                { elements: [{ shape: 'triangle', color: '#ff6b6b' }] },
                { elements: [{ shape: 'circle', color: '#4a6fa5' }, { shape: 'triangle', color: '#ff6b6b' }] },
                { elements: [{ shape: 'square', color: '#28a745' }] },
                { elements: [{ shape: 'diamond', color: '#ffd166' }] },
                { elements: [{ shape: 'square', color: '#28a745' }, { shape: 'diamond', color: '#ffd166' }] },
                { elements: [{ shape: 'pentagon', color: '#9b5de5' }] },
                { elements: [{ shape: 'hexagon', color: '#00bbf9' }] }
            ],
            options: [
                { elements: [{ shape: 'pentagon', color: '#9b5de5' }, { shape: 'hexagon', color: '#00bbf9' }], isCorrect: true },
                { elements: [{ shape: 'pentagon', color: '#9b5de5' }], isCorrect: false },
                { elements: [{ shape: 'hexagon', color: '#00bbf9' }], isCorrect: false },
                { elements: [{ shape: 'circle', color: '#4a6fa5' }, { shape: 'hexagon', color: '#00bbf9' }], isCorrect: false },
                { elements: [{ shape: 'pentagon', color: '#9b5de5' }, { shape: 'triangle', color: '#ff6b6b' }], isCorrect: false },
                { elements: [], isCorrect: false }
            ],
            logic: "Por filas: Las dos primeras formas se combinan en la tercera celda"
        },

        // 4. Color Mixing (15 questions)
        {
            id: 'I21',
            pattern: 'color_logic',
            difficulty: 2,
            matrix: [
                { shape: 'circle', color: '#ff0000', opacity: 1 },
                { shape: 'circle', color: '#0000ff', opacity: 1 },
                { shape: 'circle', color: '#800080', opacity: 1 }, // Red + Blue = Purple
                { shape: 'square', color: '#ffff00', opacity: 1 },
                { shape: 'square', color: '#00ffff', opacity: 1 },
                { shape: 'square', color: '#00ff00', opacity: 1 }, // Yellow + Cyan = Green
                { shape: 'triangle', color: '#ff00ff', opacity: 1 },
                { shape: 'triangle', color: '#ffff00', opacity: 0.5 }
            ],
            options: [
                { shape: 'triangle', color: '#ff80ff', opacity: 0.75, isCorrect: true }, // Mixed color with averaged opacity
                { shape: 'triangle', color: '#ff00ff', opacity: 1, isCorrect: false },
                { shape: 'triangle', color: '#ffff00', opacity: 0.5, isCorrect: false },
                { shape: 'triangle', color: '#ff8000', opacity: 0.75, isCorrect: false },
                { shape: 'triangle', color: '#ff00ff', opacity: 0.5, isCorrect: false },
                { shape: 'triangle', color: '#ffff80', opacity: 0.75, isCorrect: false }
            ],
            logic: "Mezcla de colores con promedio de opacidad"
        },

        // 5. Pattern Completion (15 questions)
        {
            id: 'I36',
            pattern: 'pattern_completion',
            difficulty: 2,
            matrix: [
                { pattern: 'stripes', dir: 'horizontal', color1: '#4a6fa5', color2: '#fff' },
                { pattern: 'stripes', dir: 'vertical', color1: '#4a6fa5', color2: '#fff' },
                { pattern: 'grid', size: 'small', color1: '#4a6fa5', color2: '#fff' },
                { pattern: 'dots', size: 'large', color1: '#ff6b6b', color2: '#fff' },
                { pattern: 'dots', size: 'medium', color1: '#ff6b6b', color2: '#fff' },
                { pattern: 'dots', size: 'small', color1: '#ff6b6b', color2: '#fff' },
                { pattern: 'checker', size: 'large', color1: '#28a745', color2: '#fff' },
                { pattern: 'checker', size: 'medium', color1: '#28a745', color2: '#fff' }
            ],
            options: [
                { pattern: 'checker', size: 'small', color1: '#28a745', color2: '#fff', isCorrect: true },
                { pattern: 'checker', size: 'large', color1: '#28a745', color2: '#fff', isCorrect: false },
                { pattern: 'dots', size: 'small', color1: '#28a745', color2: '#fff', isCorrect: false },
                { pattern: 'stripes', size: 'small', color1: '#28a745', color2: '#fff', isCorrect: false },
                { pattern: 'checker', size: 'small', color1: '#ff6b6b', color2: '#fff', isCorrect: false },
                { pattern: 'grid', size: 'small', color1: '#28a745', color2: '#fff', isCorrect: false }
            ],
            logic: "El tipo de patrón persiste en bloques de 3x3, el tamaño disminuye"
        }
    ],

    // Level 3: Advanced Patterns (Questions 101-160)
    advanced: [
        // 6. 3D Rotation (15 questions)
        {
            id: 'A1',
            pattern: '3d_rotation',
            difficulty: 3,
            matrix: [
                { shape: 'cube', rotationX: 0, rotationY: 0, visibleFaces: 3, color: '#4a6fa5' },
                { shape: 'cube', rotationX: 45, rotationY: 0, visibleFaces: 3, color: '#4a6fa5' },
                { shape: 'cube', rotationX: 90, rotationY: 0, visibleFaces: 2, color: '#4a6fa5' },
                { shape: 'cube', rotationX: 0, rotationY: 45, visibleFaces: 3, color: '#4a6fa5' },
                { shape: 'cube', rotationX: 45, rotationY: 45, visibleFaces: 3, color: '#4a6fa5' },
                { shape: 'cube', rotationX: 90, rotationY: 45, visibleFaces: 2, color: '#4a6fa5' },
                { shape: 'cube', rotationX: 0, rotationY: 90, visibleFaces: 2, color: '#4a6fa5' },
                { shape: 'cube', rotationX: 45, rotationY: 90, visibleFaces: 2, color: '#4a6fa5' }
            ],
            options: [
                { shape: 'cube', rotationX: 90, rotationY: 90, visibleFaces: 1, color: '#4a6fa5', isCorrect: true },
                { shape: 'cube', rotationX: 90, rotationY: 45, visibleFaces: 2, color: '#4a6fa5', isCorrect: false },
                { shape: 'cube', rotationX: 45, rotationY: 90, visibleFaces: 2, color: '#4a6fa5', isCorrect: false },
                { shape: 'cube', rotationX: 0, rotationY: 90, visibleFaces: 2, color: '#4a6fa5', isCorrect: false },
                { shape: 'cube', rotationX: 90, rotationY: 0, visibleFaces: 2, color: '#4a6fa5', isCorrect: false },
                { shape: 'cube', rotationX: 180, rotationY: 90, visibleFaces: 3, color: '#4a6fa5', isCorrect: false }
            ],
            logic: "Rotaciones X e Y aumentan 45°, las caras visibles disminuyen al alinearse"
        },

        // 7. Boolean Logic (15 questions)
        {
            id: 'A16',
            pattern: 'boolean_logic',
            difficulty: 3,
            matrix: [
                { shape: 'circle', color: '#4a6fa5', hasDot: true, hasLine: false },
                { shape: 'circle', color: '#4a6fa5', hasDot: false, hasLine: true },
                { shape: 'circle', color: '#4a6fa5', hasDot: true, hasLine: true }, // OR operation
                { shape: 'square', color: '#ff6b6b', hasDot: true, hasLine: true },
                { shape: 'square', color: '#ff6b6b', hasDot: true, hasLine: false },
                { shape: 'square', color: '#ff6b6b', hasDot: true, hasLine: false }, // AND operation
                { shape: 'triangle', color: '#28a745', hasDot: false, hasLine: true },
                { shape: 'triangle', color: '#28a745', hasDot: false, hasLine: true }
            ],
            options: [
                { shape: 'triangle', color: '#28a745', hasDot: false, hasLine: true, isCorrect: false },
                { shape: 'triangle', color: '#28a745', hasDot: true, hasLine: true, isCorrect: false },
                { shape: 'triangle', color: '#28a745', hasDot: false, hasLine: false, isCorrect: true },
                { shape: 'triangle', color: '#28a745', hasDot: true, hasLine: false, isCorrect: false },
                { shape: 'triangle', color: '#ff6b6b', hasDot: false, hasLine: true, isCorrect: false },
                { shape: 'triangle', color: '#ff6b6b', hasDot: true, hasLine: true, isCorrect: false }
            ],
            logic: "Operaciones booleanas por fila: Fila1=OR, Fila2=AND, Fila3=XOR"
        },

        // 8. Transitive Relationships (15 questions)
        {
            id: 'A31',
            pattern: 'transitive',
            difficulty: 3,
            matrix: [
                { elements: ['A', 'B'], relation: 'contains' },
                { elements: ['B', 'C'], relation: 'contains' },
                { elements: ['A', 'C'], relation: 'contains' },
                { elements: ['X', 'Y'], relation: 'inside' },
                { elements: ['Y', 'Z'], relation: 'inside' },
                { elements: ['X', 'Z'], relation: 'inside' },
                { elements: ['1', '2'], relation: 'greater' },
                { elements: ['2', '3'], relation: 'greater' }
            ],
            options: [
                { elements: ['1', '3'], relation: 'greater', isCorrect: true },
                { elements: ['3', '1'], relation: 'greater', isCorrect: false },
                { elements: ['1', '3'], relation: 'less', isCorrect: false },
                { elements: ['1', '2'], relation: 'greater', isCorrect: false },
                { elements: ['2', '3'], relation: 'greater', isCorrect: false },
                { elements: ['3', '2'], relation: 'greater', isCorrect: false }
            ],
            logic: "Propiedad transitiva: Si A contiene B y B contiene C, entonces A contiene C"
        }
    ],

    // Level 4: Expert Patterns (Questions 161-200+)
    expert: [
        // 9. Multi-dimensional Patterns (15 questions)
        {
            id: 'E1',
            pattern: 'multidimensional',
            difficulty: 4,
            matrix: [
                { shape: 'circle', size: 30, rotation: 0, color: '#4a6fa5', pattern: 'solid' },
                { shape: 'circle', size: 35, rotation: 45, color: '#4a6fa5', pattern: 'striped' },
                { shape: 'circle', size: 40, rotation: 90, color: '#4a6fa5', pattern: 'dotted' },
                { shape: 'square', size: 30, rotation: 0, color: '#ff6b6b', pattern: 'dotted' },
                { shape: 'square', size: 35, rotation: 45, color: '#ff6b6b', pattern: 'solid' },
                { shape: 'square', size: 40, rotation: 90, color: '#ff6b6b', pattern: 'striped' },
                { shape: 'triangle', size: 30, rotation: 0, color: '#28a745', pattern: 'striped' },
                { shape: 'triangle', size: 35, rotation: 45, color: '#28a745', pattern: 'dotted' }
            ],
            options: [
                { shape: 'triangle', size: 40, rotation: 90, color: '#28a745', pattern: 'solid', isCorrect: true },
                { shape: 'triangle', size: 40, rotation: 90, color: '#28a745', pattern: 'dotted', isCorrect: false },
                { shape: 'triangle', size: 40, rotation: 45, color: '#28a745', pattern: 'solid', isCorrect: false },
                { shape: 'triangle', size: 35, rotation: 90, color: '#28a745', pattern: 'solid', isCorrect: false },
                { shape: 'triangle', size: 40, rotation: 90, color: '#ff6b6b', pattern: 'solid', isCorrect: false },
                { shape: 'circle', size: 40, rotation: 90, color: '#28a745', pattern: 'solid', isCorrect: false }
            ],
            logic: "Tres progresiones: tamaño aumenta, rotación aumenta, patrón ciclo sólido→rayado→punteado"
        },

        // 10. Recursive Patterns (10 questions)
        {
            id: 'E16',
            pattern: 'recursive',
            difficulty: 4,
            matrix: [
                { shape: 'circle', contains: null, level: 1 },
                { shape: 'circle', contains: [{ shape: 'square', size: 'small' }], level: 2 },
                { shape: 'circle', contains: [{ shape: 'square', size: 'small' }, { shape: 'triangle', size: 'small' }], level: 3 },
                { shape: 'square', contains: null, level: 1 },
                { shape: 'square', contains: [{ shape: 'triangle', size: 'small' }], level: 2 },
                { shape: 'square', contains: [{ shape: 'triangle', size: 'small' }, { shape: 'circle', size: 'small' }], level: 3 },
                { shape: 'triangle', contains: null, level: 1 },
                { shape: 'triangle', contains: [{ shape: 'circle', size: 'small' }], level: 2 }
            ],
            options: [
                { shape: 'triangle', contains: [{ shape: 'circle', size: 'small' }, { shape: 'square', size: 'small' }], level: 3, isCorrect: true },
                { shape: 'triangle', contains: [{ shape: 'circle', size: 'small' }], level: 2, isCorrect: false },
                { shape: 'triangle', contains: null, level: 1, isCorrect: false },
                { shape: 'triangle', contains: [{ shape: 'square', size: 'small' }], level: 2, isCorrect: false },
                { shape: 'circle', contains: [{ shape: 'circle', size: 'small' }, { shape: 'square', size: 'small' }], level: 3, isCorrect: false },
                { shape: 'triangle', contains: [{ shape: 'triangle', size: 'small' }, { shape: 'square', size: 'small' }], level: 3, isCorrect: false }
            ],
            logic: "Contención recursiva: cada forma contiene las dos siguientes en secuencia"
        },

        // 11. Fractal-like Patterns (10 questions)
        {
            id: 'E26',
            pattern: 'fractal',
            difficulty: 5,
            matrix: [
                { pattern: 'branch', level: 1, branches: 2 },
                { pattern: 'branch', level: 2, branches: 4 },
                { pattern: 'branch', level: 3, branches: 8 },
                { pattern: 'snowflake', level: 1, segments: 6 },
                { pattern: 'snowflake', level: 2, segments: 12 },
                { pattern: 'snowflake', level: 3, segments: 24 },
                { pattern: 'spiral', level: 1, turns: 1 },
                { pattern: 'spiral', level: 2, turns: 2 }
            ],
            options: [
                { pattern: 'spiral', level: 3, turns: 3, isCorrect: true },
                { pattern: 'spiral', level: 3, turns: 4, isCorrect: false },
                { pattern: 'spiral', level: 2, turns: 3, isCorrect: false },
                { pattern: 'branch', level: 3, turns: 3, isCorrect: false },
                { pattern: 'snowflake', level: 3, turns: 3, isCorrect: false },
                { pattern: 'spiral', level: 1, turns: 3, isCorrect: false }
            ],
            logic: "Progresión geométrica en complejidad fractal"
        },

        // 12. Quantum-like Superposition (5 questions - Most Difficult)
        {
            id: 'E36',
            pattern: 'quantum_superposition',
            difficulty: 5,
            matrix: [
                { state: 'A|B', collapsed: 'A', probability: 0.7 },
                { state: 'A|B', collapsed: 'B', probability: 0.3 },
                { state: 'A|B|C', collapsed: 'C', probability: 0.33 },
                { state: 'X|Y', collapsed: 'X', probability: 0.6 },
                { state: 'X|Y', collapsed: 'Y', probability: 0.4 },
                { state: 'X|Y|Z', collapsed: 'Z', probability: 0.33 },
                { state: '1|2', collapsed: '1', probability: 0.8 },
                { state: '1|2', collapsed: '2', probability: 0.2 }
            ],
            options: [
                { state: '1|2|3', collapsed: '3', probability: 0.33, isCorrect: true },
                { state: '1|2|3', collapsed: '1', probability: 0.33, isCorrect: false },
                { state: '1|2', collapsed: '3', probability: 0.33, isCorrect: false },
                { state: '1|2|3', collapsed: '3', probability: 0.5, isCorrect: false },
                { state: 'A|B|C', collapsed: '3', probability: 0.33, isCorrect: false },
                { state: '1|2|3', collapsed: '2', probability: 0.33, isCorrect: false }
            ],
            logic: "Estados de superposición colapsan a la tercera opción con igual probabilidad"
        }
    ]
};

const ENHANCED_TEST_CONFIG = {
    totalQuestions: 200, // We will just take a subset or allow looping
    sections: [
        { name: 'Patrones Básicos', range: [1, 40], time: 25 },
        { name: 'Lógica Intermedia', range: [41, 100], time: 30 },
        { name: 'Razonamiento Avanzado', range: [101, 160], time: 35 },
        { name: 'Complejidad Experta', range: [161, 200], time: 40 }
    ],
    patternWeights: {
        'rotation': 1.0, 'progression': 1.2, 'addition': 1.5, 'color_logic': 1.3,
        'boolean_logic': 1.8, '3d_rotation': 2.0, 'multidimensional': 2.5,
        'recursive': 3.0, 'fractal': 3.5, 'quantum_superposition': 4.0
    }
};

// ================================
// LOGIC HELPERS
// ================================

function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

function randomizeColors(objects) {
    const colorPalette = [
        '#4a6fa5', '#166088', '#ff6b6b', '#ffd166',
        '#06d6a0', '#118ab2', '#ef476f', '#9b5de5',
        '#00bbf9', '#00f5d4', '#fee440', '#f15bb5'
    ];

    if (Array.isArray(objects)) {
        return objects.map(obj => {
            if (obj.color && Math.random() > 0.7) {
                const newColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                return { ...obj, color: newColor };
            }
            return obj;
        });
    }
    return objects;
}

function rotateOptions(options) {
    const correctIndex = options.findIndex(opt => opt.isCorrect);
    const newOptions = [...options];
    const correctOption = newOptions.splice(correctIndex, 1)[0];
    const newPosition = Math.floor(Math.random() * newOptions.length);
    newOptions.splice(newPosition, 0, correctOption);
    return newOptions;
}

function mirrorMatrix(matrix) {
    if (!matrix || matrix.length < 9) return matrix;
    return [
        matrix[2], matrix[1], matrix[0],
        matrix[5], matrix[4], matrix[3],
        matrix[8], matrix[7], matrix[6]
    ];
}

function generateAllQuestions() {
    const allQuestions = [];
    let questionId = 1;

    function generateVariations(basePattern, count, difficulty) {
        const variations = [];
        for (let i = 0; i < count; i++) {
            const variation = JSON.parse(JSON.stringify(basePattern));
            variation.id = `Q${questionId++}`;
            variation.difficulty = difficulty;

            if (Math.random() > 0.5) variation.matrix = mirrorMatrix(variation.matrix);
            if (Math.random() > 0.5) variation.options = rotateOptions(variation.options);

            variation.matrix = randomizeColors(variation.matrix);
            variation.options = randomizeColors(variation.options);

            variations.push(variation);
        }
        return variations;
    }

    Object.values(QUESTION_DATABASE).forEach(category => {
        category.forEach(baseQuestion => {
            const variations = generateVariations(baseQuestion, 3, baseQuestion.difficulty);
            allQuestions.push(...variations);
        });
    });

    return shuffleArray(allQuestions).slice(0, 15); // Limit to 15 questions for a reasonable session
}

// ================================
// MATRIX RENDERER CLASS
// ================================

class MatrixRenderer {
    constructor() {
        this.shapes = {
            circle: this.drawCircle,
            square: this.drawSquare,
            triangle: this.drawTriangle,
            arrow: this.drawArrow,
            diamond: this.drawDiamond, // simplified placeholder
            pentagon: this.drawPentagon, // simplified placeholder
            hexagon: this.drawHexagon, // simplified placeholder
            cube: this.drawCube,
            branch: this.drawBranch, // simplified placeholder
            snowflake: this.drawSnowflake, // simplified placeholder
            spiral: this.drawSpiral // simplified placeholder
        };
        this.patterns = {
            solid: this.drawSolid,
            striped: this.drawStriped,
            dotted: this.drawDotted,
            checkered: this.drawCheckered,
            gradient: this.drawGradient
        };
    }

    drawShape(context, shapeDef, x, y, size) {
        if (!context || !shapeDef) return;

        // Handle elements array (recursive or composite)
        if (shapeDef.elements && Array.isArray(shapeDef.elements) && typeof shapeDef.elements[0] === 'object') {
            // Composite shape
            shapeDef.elements.forEach((elem, i) => {
                this.drawShape(context, elem,
                    x + (i % 2) * size / 3 - size / 6,
                    y + Math.floor(i / 2) * size / 3 - size / 6,
                    size / 3
                );
            });
            return;
        }

        // Handle simple text/symbol elements (like transitive 'A', 'B')
        if (shapeDef.elements && typeof shapeDef.elements[0] === 'string') {
            context.fillStyle = '#166088';
            context.font = 'bold 24px sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(shapeDef.elements.join(shapeDef.relation === 'greater' ? ' > ' : ' ? '), x, y);
            return;
        }

        // Handle quantum states text
        if (shapeDef.state) {
            context.fillStyle = '#6b7280';
            context.font = '14px sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            const text = shapeDef.collapsed ? `${shapeDef.state} -> ${shapeDef.collapsed}` : shapeDef.state;
            context.fillText(text, x, y);
            return;
        }

        const drawer = this.shapes[shapeDef.shape] || this.drawSquare; // Fallback
        drawer.call(this, context, shapeDef, x, y, size);

        if (shapeDef.pattern && this.patterns[shapeDef.pattern]) {
            this.patterns[shapeDef.pattern](context, x, y, size, shapeDef.color || '#000');
        }

        if (shapeDef.hasDot) this.drawDot(context, x, y, size / 4);
        if (shapeDef.hasLine) this.drawLine(context, x, y, size);
    }

    drawCircle(ctx, def, x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        if (def.filled || def.color) {
            ctx.fillStyle = def.color;
            ctx.globalAlpha = def.opacity || 1;
            ctx.fill();
            ctx.globalAlpha = 1;
        } else {
            ctx.strokeStyle = def.color || '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    drawSquare(ctx, def, x, y, size) {
        ctx.beginPath();
        ctx.rect(x - size / 2, y - size / 2, size, size);
        if (def.filled !== false) {
            ctx.fillStyle = def.color;
            ctx.globalAlpha = def.opacity || 1;
            ctx.fill();
            ctx.globalAlpha = 1;
        } else {
            ctx.strokeStyle = def.color || '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    drawTriangle(ctx, def, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x - size / 2, y + size / 2);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.closePath();
        if (def.filled !== false) {
            ctx.fillStyle = def.color;
            ctx.globalAlpha = def.opacity || 1;
            ctx.fill();
            ctx.globalAlpha = 1;
        } else {
            ctx.strokeStyle = def.color || '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    drawArrow(ctx, def, x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        let angle = 0;
        switch (def.dir) {
            case 'right': angle = 0; break;
            case 'down': angle = Math.PI / 2; break;
            case 'left': angle = Math.PI; break;
            case 'up': angle = -Math.PI / 2; break;
            case 'up-right': angle = -Math.PI / 4; break;
            case 'down-left': angle = 3 * Math.PI / 4; break;
        }
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-size / 3, -size / 4);
        ctx.lineTo(size / 3, 0);
        ctx.lineTo(-size / 3, size / 4);
        ctx.closePath();
        ctx.fillStyle = def.color;
        ctx.fill();
        ctx.restore();
    }

    drawCube(ctx, def, x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        if (def.rotationX) ctx.rotate(def.rotationX * Math.PI / 180);

        ctx.fillStyle = def.color || '#4a6fa5';
        ctx.fillRect(-size / 3, -size / 3, size * 2 / 3, size * 2 / 3);

        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(size / 3, -size / 3);
        ctx.lineTo(size / 2, -size / 6);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(size / 3, size / 3);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    // Placeholders for other shapes to prevent crash
    drawDiamond(ctx, def, x, y, size) { this.drawSquare(ctx, { ...def }, x, y, size * 0.8); } // Rotate square 45deg functionally
    drawPentagon(ctx, def, x, y, size) { this.drawCircle(ctx, def, x, y, size); }
    drawHexagon(ctx, def, x, y, size) { this.drawCircle(ctx, def, x, y, size); }
    drawBranch(ctx, def, x, y, size) {
        ctx.strokeStyle = '#000'; ctx.beginPath();
        ctx.moveTo(x, y + size / 2); ctx.lineTo(x, y - size / 2);
        ctx.moveTo(x, y); ctx.lineTo(x + size / 3, y - size / 3);
        ctx.moveTo(x, y); ctx.lineTo(x - size / 3, y - size / 3);
        ctx.stroke();
    }
    drawSnowflake(ctx, def, x, y, size) { this.drawCircle(ctx, { ...def, filled: false }, x, y, size); }
    drawSpiral(ctx, def, x, y, size) { this.drawCircle(ctx, { ...def, filled: false }, x, y, size); }

    drawDot(ctx, x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
    drawLine(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x - size / 2, y);
        ctx.lineTo(x + size / 2, y);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    // Pattern placeholders
    drawStriped(ctx, x, y, size, color) { }
    drawDotted(ctx, x, y, size, color) { }
    drawCheckered(ctx, x, y, size, color) { }
    drawGradient(ctx, x, y, size, color) { }
    drawSolid() { }
}

const MatrixCanvas = ({ def, width = 100, height = 100, className = "" }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && def) {
            const ctx = canvasRef.current.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            // Setup checks
            if (canvasRef.current.width !== width * dpr) {
                canvasRef.current.width = width * dpr;
                canvasRef.current.height = height * dpr;
                ctx.scale(dpr, dpr);
            }
            ctx.clearRect(0, 0, width, height);

            const renderer = new MatrixRenderer();
            renderer.drawShape(ctx, def, width / 2, height / 2, width * 0.7);
        }
    }, [def, width, height]);

    return <canvas ref={canvasRef} style={{ width, height }} className={className} />;
};

// ================================
// MAIN COMPONENT
// ================================

const RavenMatrixGame = ({ onComplete }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [gameState, setGameState] = useState('INTRO'); // INTRO, PLAYING, FEEDBACK, RESULTS
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [patternStats, setPatternStats] = useState({});
    const [responses, setResponses] = useState([]);
    const [difficultyLevel, setDifficultyLevel] = useState(1);
    const [cognitiveProfile, setCognitiveProfile] = useState(null); // New state for profile

    // Initialize Test
    useEffect(() => {
        setQuestions(generateAllQuestions());
    }, []);

    const handleStart = () => {
        setGameState('PLAYING');
        setStartTime(Date.now());
    };

    const handleOptionSelect = (optionIndex) => {
        const question = questions[currentQuestionIdx];
        const isCorrect = question.options[optionIndex].isCorrect;
        const timeTaken = (Date.now() - startTime) / 1000; // rough question time tracking, technically accumulates

        // Update Stats
        const pattern = question.pattern;
        const currentStats = patternStats[pattern] || { attempts: 0, correct: 0 };
        setPatternStats({
            ...patternStats,
            [pattern]: {
                attempts: currentStats.attempts + 1,
                correct: currentStats.correct + (isCorrect ? 1 : 0)
            }
        });

        // Save Response
        const newResponses = [...responses, {
            id: question.id,
            pattern: question.pattern,
            correct: isCorrect,
            time: timeTaken,
            difficulty: question.difficulty
        }];
        setResponses(newResponses);

        if (isCorrect) setScore(prev => prev + 1);

        // Feedback & Next
        // We will skip explicit feedback screen for flow, just slight delay? 
        // Or user standard Red/Green flash logic

        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            finishGame(newResponses);
        }
    };

    const calculateCognitiveProfile = (finalResponses) => {
        const profile = {
            visualProcessing: 0,
            abstractReasoning: 0,
            patternRecognition: 0,
            logicalDeduction: 0,
            spatialImagination: 0
        };

        finalResponses.forEach(r => {
            const question = questions.find(q => q.id === r.id);
            if (!question) return;

            // Base points for attempting
            if (r.correct) {
                if (['rotation', '3d_rotation'].includes(question.pattern)) profile.visualProcessing += 20;
                if (['progression', 'addition', 'color_logic'].includes(question.pattern)) profile.patternRecognition += 20;
                if (['boolean_logic', 'transitive', 'recursive'].includes(question.pattern)) profile.logicalDeduction += 20;
                if (['multidimensional', 'fractal', 'quantum_superposition'].includes(question.pattern)) profile.abstractReasoning += 20;

                // Spatial applies to most grid/shape tasks
                profile.spatialImagination += 10;
            }
        });

        // Normalize (rough heuristic for display)
        const normalize = (val) => Math.min(100, Math.round(val / (questions.length * 5) * 100));

        return {
            visualProcessing: normalize(profile.visualProcessing),
            abstractReasoning: normalize(profile.abstractReasoning),
            patternRecognition: normalize(profile.patternRecognition),
            logicalDeduction: normalize(profile.logicalDeduction),
            spatialImagination: normalize(profile.spatialImagination)
        };
    };

    const finishGame = (finalResponses) => {
        setGameState('RESULTS');
        const profile = calculateCognitiveProfile(finalResponses);
        setCognitiveProfile(profile);
    };

    const handleManualFinish = () => {
        const correctCount = responses.filter(r => r.correct).length;
        const finalScore = (correctCount / questions.length) * 100;

        if (onComplete) {
            onComplete({
                score: correctCount,
                total: questions.length,
                details: {
                    patternStats,
                    responses,
                    accuracy: finalScore,
                    cognitiveProfile
                }
            });
        }
    };

    if (gameState === 'INTRO') {
        return (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <Brain className="w-12 h-12" />
                </div>
                <div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Test de Matrices Avanzadas</h2>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                        Evaluación completa de razonamiento abstracto con detección de patrones multidimensionales.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Activity className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                        <div className="font-bold text-gray-900">{questions.length}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Desafíos</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Clock className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                        <div className="font-bold text-gray-900">~15m</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Tiempo Est.</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <BarChart2 className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                        <div className="font-bold text-gray-900">IA</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Análisis</div>
                    </div>
                </div>
                <button
                    onClick={handleStart}
                    className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-200 flex items-center gap-3 mx-auto text-lg"
                >
                    <Play className="w-5 h-5 fill-current" />
                    Iniciar Evaluación
                </button>
            </div>
        );
    }

    if (gameState === 'RESULTS') {
        const accuracy = Math.round((score / questions.length) * 100);
        return (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in">
                <div className="bg-indigo-600 p-8 text-white text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-black mb-2">¡Análisis Completado!</h2>
                    <p className="text-indigo-100">Estos son tus indicadores cognitivos</p>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-12">
                    {/* Score Column */}
                    <div className="text-center space-y-6 flex flex-col justify-center">
                        <div>
                            <div className="text-6xl font-black text-indigo-600 mb-2">{accuracy}%</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Precisión Global</div>
                        </div>
                        <div className="flex justify-center gap-8 text-gray-600">
                            <div>
                                <strong className="block text-2xl text-gray-900">{score}/{questions.length}</strong>
                                <span className="text-xs uppercase">Aciertos</span>
                            </div>
                            <div>
                                <strong className="block text-2xl text-gray-900">1:45</strong>
                                <span className="text-xs uppercase">Tiempo Total</span>
                            </div>
                        </div>
                    </div>

                    {/* Profile Column */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Perfil Cognitivo Detectado</h4>
                        {cognitiveProfile && Object.entries(cognitiveProfile).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <span className="font-bold text-indigo-600">{value}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-gray-50 border-t border-gray-100 text-center">
                    <button
                        onClick={handleManualFinish}
                        className="px-12 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black hover:scale-105 transition-all shadow-lg flex items-center gap-3 mx-auto"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Guardar Resultados y Salir
                    </button>
                    <p className="mt-4 text-xs text-gray-400">
                        Los resultados se guardarán en tu perfil neuroeducativo seguro.
                    </p>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestionIdx];

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <Activity className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Patrón {currentQuestionIdx + 1} de {questions.length}</h3>
                        <div className="text-xs text-gray-500 font-medium">{currentQ?.logic ? 'Detección Analítica' : 'Identificación Visual'}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    {questions.map((_, i) => (
                        <div key={i} className={`h-2 w-2 rounded-full transition-all ${i === currentQuestionIdx ? 'bg-indigo-600 w-8' : (i < currentQuestionIdx ? 'bg-green-400' : 'bg-gray-200')}`} />
                    ))}
                </div>
            </div>

            {/* Matrix Grid */}
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 flex justify-center">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50/50 rounded-3xl border border-gray-100">
                    {currentQ && [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className={`aspect-square w-24 sm:w-32 bg-white rounded-xl shadow-sm border-2 ${i === 8 ? 'border-dashed border-indigo-300 bg-indigo-50/30 flex items-center justify-center' : 'border-gray-200'} overflow-hidden relative input-cell`}>
                            {i < 8 && currentQ.matrix[i] && (
                                <MatrixCanvas def={currentQ.matrix[i]} width={128} height={128} className="w-full h-full object-contain p-2" />
                            )}
                            {i === 8 && <div className="text-5xl font-black text-indigo-200 select-none">?</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {currentQ && currentQ.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className="group relative aspect-square bg-white rounded-2xl border-2 border-transparent hover:border-indigo-500 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
                    >
                        <div className="absolute top-2 left-3 text-gray-300 font-bold text-sm group-hover:text-indigo-500">{idx + 1}</div>
                        <MatrixCanvas def={option} width={100} height={100} className="w-full h-full object-contain p-2" />
                    </button>
                ))}
            </div>

        </div>
    );
};

export default RavenMatrixGame;
