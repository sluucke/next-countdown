
import { useEffect, useState, useReducer } from 'react'
import { FaArrowLeft, FaLink } from 'react-icons/fa'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CopyToClipboard } from 'react-copy-to-clipboard'
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST': return { loading: true, error: '' };
    case 'FETCH_SUCCESS': return { loading: false };
    case 'FETCH_FAIL': return { loading: false, error: 'Something wrong try again later' }
    default:
      throw new Error()
  }
}
function Counter({ params }) {
  const id = params.id
  const [state, dispatch] = useReducer(reducer, {
    loading,
    error
  })
  const { loading, error } = state
  const [copy, setCopy] = useState({ copied: false })
  const [dateDb, setDateDb] = useState(1640995200000)
  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()
  const router = useRouter()
  if (!id) {
    router.push('/')
  }
  useEffect(async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' })
      const { data } = await axios.get(`/api/counter/${id}`)
      setDateDb(parseInt(data.date))
      setTimeout(() => {

        dispatch({ type: 'FETCH_SUCCESS' })
      }, 2000)

    } catch (err) {
      dispatch({ type: 'FETCH_FAIL' })
    }
  }, [])
  useEffect(() => {
    const date = new Date(dateDb)
    const fixedDate = date.valueOf() + date.getTimezoneOffset() * 60000
    const distance = fixedDate - new Date().getTime()

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timer =
      setInterval(() => {
        setSeconds(seconds)
        setMinutes(minutes)
        setHours(hours)
        setDays(days)
      }, 1000);
    return () => clearInterval(timer);
  }, [seconds])
  const onCopy = () => {
    setCopy({ copied: true })
    setTimeout(() => {
      setCopy({ copied: false })
    }, 2000)
  }
  return (
    <>
      <div className="overflow-x-hidden" style={{ background: "linear-gradient(90deg,#121214,rgba(0,0,0,.8)),url('https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')", height: '100vh' }}>
        <div className="flex items-center justify-center w-screen h-full">
          <div className="flex-col">
            <h1 className="text-gray-400 text-5xl font-extrabold py-3 text-center">Restam</h1>
            {loading ? (
              <p className="text-white text-3xl font-bold">Carregando...</p>
            ) : (
              <div className="grid grid-rows-1 grid-cols-4 gap-1 text-gray-200 text-6xl font-bold">

                <div className="rounded bg-primary py-4 px-2 bg-opacity-60 flex flex-col">

                  <p>{days}</p>
                  <p className="text-lg">{days == 1 ? 'DIA' : 'DIAS'}</p>
                </div>
                <div className="rounded bg-primary py-4 px-2 bg-opacity-60 flex flex-col">
                  <p>{hours}</p>
                  <p className="text-lg">{hours == 1 ? 'HORA' : 'HORAS'}</p>

                </div>
                <div className="rounded bg-primary py-4 px-2 bg-opacity-60 flex flex-col">
                  <p>{minutes}</p>
                  <p className="text-lg">{minutes == 1 ? 'MINUTO' : 'MINUTOS'}</p>

                </div>
                <div className="rounded bg-primary py-4 px-2 bg-opacity-60 flex flex-col">
                  <p>{seconds}</p>
                  <p className="text-lg">SEGUNDOS</p>

                </div>
              </div>
            )}
            {/* <p className="text-gray-200 text-6xl font-bold">
          {days}d {hours}h {minutes}m {seconds}s
        </p> */}

          </div>
        </div>

        <footer className="w-full min-h-10 bg-shape p-4 flex justify-between items-center">
          <div>
            <Link href="/" passHref><a className="rounded py-2 px-2 bg-primary hover:bg-primary-hover transition-color duration-300 flex items-center"><FaArrowLeft className="pr-1" />Voltar para página inicial</a></Link>
          </div>
          <div>
            <p>2021 &copy; by <a className="text-white-200 hover:text-primary" href="https://github.com/sluucke">Sluucke</a></p>
          </div>
          <div>
            <CopyToClipboard text={window.location.href} onCopy={onCopy}>
              <button className="rounded py-2 px-2 bg-primary hover:bg-primary-hover transition-color duration-300 flex items-center"><FaLink className="pr-1" />{copy.copied ? 'Copiado' : 'Compartilhar'}</button>
            </CopyToClipboard>
          </div>
        </footer>
      </div>
    </>
  )
}

export function getServerSideProps({ params }) {
  return {
    props: {
      params
    }
  }
}

export default dynamic(() => Promise.resolve(Counter), { ssr: false })
