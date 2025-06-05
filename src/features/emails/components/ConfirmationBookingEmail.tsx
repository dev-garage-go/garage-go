import React from 'react'

interface Props {
  firstName: string
}

export const ConfirmationBookingEmail = ({ firstName }: Props) => {
  return (
    <div>
      <h1>Hello {firstName}</h1>
    </div>
  )
}
