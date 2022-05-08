import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

//Jest.fn() é uma função, sem funcionalidade, para testar se as funções da nossa aplicação foi chamada.
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    //Com o spy (para testar se a função foi chamada na aplicação)
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }

    //Sem verificação da chamada da função
    // {create: async () => {} },
    // {sendMail: async () => {} }
)

describe('Submit feedback', () => {

    it('should be able to submit feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;64',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;64',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.png',
        })).rejects.toThrow();
    });
});