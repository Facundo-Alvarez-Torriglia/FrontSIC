import { z } from 'zod'

export const signinShemma = z.object({
    usuario: z.string().min(6, 'El usuario debe contener al menos 6 caracteres'), 
    password: z.string().min(6, 'La contraseña debe contener 6 caracternes'),
})
