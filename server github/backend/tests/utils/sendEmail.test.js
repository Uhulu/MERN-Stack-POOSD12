const sendEmail = require('../../utils/sendEmail')
const nodemailer = require('nodemailer')

jest.mock('nodemailer')

describe('sendEmail Utility', () => {
    test('should send an email successfully', async () => {
        const sendMailMock = jest.fn().mockResolvedValue('Email sent successfully')
        nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })

        await sendEmail('test@example.com', 'Test Subject', 'Test emailBody')

        expect(sendMailMock).toHaveBeenCalledWith({
            from: process.env.EMAIL,
            to: 'test@example.com',
            subject: 'Test Subject',
            html: expect.stringContaining('Email Verification'), 
        })
    })

    test('should handle errors during email sending', async () => {
        const sendMailMock = jest.fn().mockRejectedValue(new Error('Email failed'))
        nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })

        await expect(
            sendEmail('test@example.com', 'Test Subject', 'Test emailBody')
        ).rejects.toThrow('Email failed')
    })
})
