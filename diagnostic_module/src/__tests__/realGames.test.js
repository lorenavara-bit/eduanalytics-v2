import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ConceptComprehensionGame from '../components/games/ConceptComprehensionGame';
import VarkGame from '../components/games/VarkGame';
import MetacognitiveAwarenessGame from '../components/games/MetacognitiveAwarenessGame';

describe('Real early detection game components', () => {
    test('ConceptComprehensionGame returns correct score after answering', async () => {
        const onComplete = jest.fn();
        render(<ConceptComprehensionGame onComplete={onComplete} />);
        // Answer true for items 1,3,5 (correct) and false for 2,4 (correct)
        const trueBtn = screen.getByText('Verdadero');
        const falseBtn = screen.getByText('Falso');
        // 1 (true)
        fireEvent.click(trueBtn);
        // 2 (false)
        fireEvent.click(falseBtn);
        // 3 (true)
        fireEvent.click(trueBtn);
        // 4 (false)
        fireEvent.click(falseBtn);
        // 5 (true)
        fireEvent.click(trueBtn);
        expect(onComplete).toHaveBeenCalledWith({ score: 5, total: 5 });
    });

    test('VarkGame returns dominant style(s)', async () => {
        const onComplete = jest.fn();
        render(<VarkGame onComplete={onComplete} />);
        const options = screen.getAllByRole('button', { name: /Visual|Auditory|Read\/Write|Kinesthetic/ });
        // Simulate answers: V, A, V, K, V, A, R, K (dominant V with 3)
        fireEvent.click(options[0]); // Visual
        fireEvent.click(options[1]); // Auditory
        fireEvent.click(options[0]); // Visual
        fireEvent.click(options[3]); // Kinesthetic
        fireEvent.click(options[0]); // Visual
        fireEvent.click(options[1]); // Auditory
        fireEvent.click(options[2]); // Read/Write
        fireEvent.click(options[3]); // Kinesthetic
        // Expect dominant style array contains 'V'
        expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ style: expect.arrayContaining(['V']) }));
    });

    test('MetacognitiveAwarenessGame returns correct score', async () => {
        const onComplete = jest.fn();
        render(<MetacognitiveAwarenessGame onComplete={onComplete} />);
        const trueBtn = screen.getByText('Verdadero');
        const falseBtn = screen.getByText('Falso');
        // Answer all correctly (true for true statements, false for false statements)
        // Items 1,3,5,7,9 are true; 2,4,6,8,10 are false
        const answers = [true, false, true, false, true, false, true, false, true, false];
        answers.forEach((ans) => {
            fireEvent.click(ans ? trueBtn : falseBtn);
        });
        expect(onComplete).toHaveBeenCalledWith({ score: 10, total: 10 });
    });
});
