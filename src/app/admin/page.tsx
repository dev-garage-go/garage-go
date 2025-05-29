"use client"

import { ErrorMessage } from "@/components";
import { useAdminContext } from "@/features/admin";


export default function AdminPage() {
  const { password, setPassword, wrongPassword, isValidPassword } = useAdminContext()

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault()
    await isValidPassword(password)
  }

  return (
    <div className="flex flex-col justify-center items-center bg-primaryBlue-50 min-h-screen">
      <div className="flex flex-col justify-center items-center w-full max-w-xl px-6 py-32 bg-customGray-50 rounded-2xl">
        <h2 className="title-h2 mb-10 font-medium text-center">
          Panel de
          <br />
          Administración
        </h2>

        <p className="mb-10 text-center max-w-md">
          Introduzca la contraseña de administrador para poder acceder al panel
        </p>

        <form
          onSubmit={handleSumbit}
          className="flex flex-col justify-start items-start w-full max-w-md"
        >
          <label
            htmlFor="admin-pass"
            className="text-sm text-customGray-500 font-light ml-2"
          >
            Contraseña
          </label>
          <div className="flex justify-center items-center gap-2 w-full">
            <input
              id="admin-pass"
              type="password"
              placeholder="******"
              className="input-form"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="primary-button max-w-32"
            >
              Continuar
            </button>
          </div>
          {wrongPassword && (<ErrorMessage message="Contraseña incorrecta, acceso denegado" className="pt-2" />)}
        </form>
      </div>
    </div>
  );
}