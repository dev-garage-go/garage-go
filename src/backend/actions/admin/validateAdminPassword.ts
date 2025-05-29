"use server"

export const validateAdminPassword = async (password: string): Promise<{ success: boolean }> => {
  const secretPassword = process.env.ADMIN_SECRET_PASSWORD

  if (!secretPassword) {
    throw new Error('Admin SecretPassword Key not founded in process.env.ADMIN_SECRET_PASSWORD')
  }

  if (password === secretPassword) {
    return { success: true }
  }
  else {
    return { success: false }
  }
}
