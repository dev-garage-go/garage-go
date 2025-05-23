"use server"

export const validateAdminPassword = async (password: string): Promise<{ success: boolean }> => {
  const secretPassword = process.env.ADMIN_SECRET_PASSWORD

  console.log(password)

  if (password === secretPassword) {
    console.log("validada")
    return { success: true }
  }
  else {
    console.log("NO validada")
    return { success: false }
  }
}
