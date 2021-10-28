import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
export default function Home() {
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const formHandler = async (e) => {
    e.preventDefault()
    if(!date) {
      setError('Insira uma data')
      setTimeout(() => {
        setError('')
      }, 5000)
      return;
    };
    if(new Date(date).getTime() < new Date().getTime()) {
      setError('Insira uma data válida')
      setTimeout(() => {
        setError('')
      }, 5000)
      return;
    }
    const newDate = new Date(date).getTime()
    const { data } = await axios.post('/api/counter', {
      date: newDate
    })
    return router.push(`/counter/${data.counter._id}`)
  }
  return (
    <>
    <Head>
       <title>Contador</title>
     </Head>
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex-col">
        <h1 className="text-gray-200 text-5xl font-extrabold py-3">Contador</h1>
        <p className="text-gray-200 text-2xl font-bold">Informe uma data</p>
          <span className="text-red-400">{error}</span>
        <form className="w-full">
          <input className="w-64 shadow text-2xl shadow-xl bg-shape border rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"
          onChange={(e) => setDate(e.target.value)} />
          <br />
          <button
            className="bg-primary hover:bg-primary-hover transition-colors duration-300 shadow-xl py-2 px-2 text-2xl text-white rounded w-full flex items-center justify-center mt-2"
            type="submit"
            onClick={formHandler}
          >
            Contar <FaArrowRight className="ml-1"/>
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
