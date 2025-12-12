'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !phone.trim()) {
      setMessage('Будь ласка, заповніть всі поля')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Дякуємо! Ми зв\'яжемося з вами найближчим часом.')
        setName('')
        setPhone('')
      } else {
        setMessage(data.error || 'Щось пішло не так. Будь ласка, спробуйте ще раз.')
      }
    } catch (error) {
      setMessage('Помилка мережі. Будь ласка, спробуйте ще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h1 className={styles.headline}>Преміальний спортивний м'яч</h1>
          <ul className={styles.characteristics}>
            <li>Підвищена витривалість</li>
            <li>Покращене зчеплення</li>
            <li>Матеріали високої якості</li>
          </ul>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ваше ім'я"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            disabled={isSubmitting}
          />
          <input
            type="tel"
            placeholder="Ваш номер телефону"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Відправка...' : 'Отримати консультацію'}
          </button>
          {message && (
            <p className={styles.message}>{message}</p>
          )}
        </form>
      </div>
    </div>
  )
}

