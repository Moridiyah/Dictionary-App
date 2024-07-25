import { useState, useEffect } from 'react'

const Nav = () => {
  const [word, setword] = useState('')
  const [definition, setdefinition] = useState('')
  const [audio, setaudio] = useState('')

  const handleInput = (e) => {
    const value = e.target.value
    setword(value)
  }

  async function fetchdiction(e) {
    e.preventDefault()
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      )
      const data = await response.json()
      setdefinition(data)
      setaudio(data[0].phonetics[0].audio)
    } catch {
      alert('error while fetching word')
    }
  }
  return (
    <div className='w-[100%] md:w-[100vw] min-h-[100vh] py-3 bg-blue-950 flex flex-col justify-center items-center'>
      <div className='w-[80%] lg:w-[40%] bg-slate-400 rounded-3xl py-8 px-8'>
        <p className='text-[36px] text-blue-950 text-center pb-[32px] font-bold'>
          Dictionary
        </p>
        <form
          onSubmit={fetchdiction}
          className='flex flex-col md:flex-row justify-between gap-6'
        >
          <input
            type='text'
            onChange={handleInput}
            placeholder='enter a word'
            className='w-[100%] md:w-[80%] h-[40%] px-3 py-4 rounded-md'
          />
          <button className='w-[100%] md:w-[20%] h-[40%] text-center bg-blue-950 px-3 py-4 rounded-md'>
            Submit
          </button>
        </form>
        <div>
          {definition && (
            <div className='pt-4 flex items-center gap-3'>
              <h2 className='text-[24px] md:text-[28px] font-bold'>Word:</h2>
              <p className='text-[24px] md:text-[28px] uppercase font-bold'>
                {definition[0].word}
              </p>
            </div>
          )}

          {definition && (
            <div className='pt-4 flex items-center gap-3'>
              <h2 className='text-[24px] md:text-[28px] font-bold'>
                Part of Speech:
              </h2>
              <p className='text-[20px] md:text-[28px] uppercase font-bold'>
                {definition[0].meanings[0].partOfSpeech}
              </p>
            </div>
          )}

          {definition && (
            <div className='pt-4 flex items-center gap-3'>
              <h2 className='text-[24px] md:text-[28px] font-bold'>
                Phonetic:
              </h2>
              <p className='text-[24px] md:text-[28px] uppercase font-bold'>
                {definition[0].phonetic}
              </p>
            </div>
          )}

          {definition && (
            <div className='pb-3'>
              <h2 className='text-[28px] pt-3 font-bold'>Definition:</h2>
              <p className='text-[18px] font-semibold'>
                {definition[0].meanings[0].definitions[0].definition}
              </p>
            </div>
          )}

          {audio && (
            <div>
              <h2 className='text-[28px] py-3 font-bold'>Pronouciation</h2>
              <audio
                controls
                src={audio}
                type='audio/mpeg'
                className='w-[100%]'
              ></audio>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav
