import { useState } from 'react'
import './App.css'
import { supabase } from './supabaseClient.js'




function App() {
    const [corridas, setCorridas] = useState('')
    const [data, setData] = useState('')
    const [valorGanho, setValorGanho] = useState('')
    const [horasTrabalhadas, setHorasTrabalhadas] = useState('')
    const [descricaoGasto, setdescricaoGasto] = useState('')
    const [valorGasto, setvalorGasto] = useState('')
    const [dataGasto, setdataGasto] = useState('')
    
    async function handleSubmit(e) {
    e.preventDefault()

    const {data: resultado, error} = await supabase
      .from('lancamentos_diarios')
      .insert([
        {
          data:data,
          corridas: parseFloat(corridas),
          valor_ganho: parseFloat(valorGanho),
          horas_trabalhadas: parseFloat(horasTrabalhadas)
        }
      ])
      
      if(error) {
          console.error('Erro ao salvar:', error)
      } else{
        console.log('Salvo com sucesso:', resultado)
        setCorridas('')
        setData('')
        setValorGanho('')
        setHorasTrabalhadas('')
      }}

       async function handleSubmitGasto(e) {
        e.preventDefault()

    const {data: resultado, error} = await supabase
      .from('gastos')
      .insert([
        {
          data:dataGasto,
          valor: parseFloat(valorGasto),
          descricao: descricaoGasto,
        }
      ])
      
      if(error) {
          console.error('Erro ao salvar:', error)
      } else{
        console.log('Salvo com sucesso:', resultado)
        setdataGasto('')
        setvalorGasto('')
        setdescricaoGasto('')
      }}

return (
    <>
     <h1>Controle Financeiro</h1>
     <section className='lancamentos-diario'>
      <h2>Lançamento do dia</h2>
     <form onSubmit={handleSubmit}>
     <label htmlFor="corridas">Quantidade de corridas</label>
      <input 
        id="corridas"
        type="number"
        value={corridas}
        onChange={(e) => setCorridas(e.target.value)}
      />
      <label htmlFor="data">Data</label>
      <input 
        id="data"
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)} 
      />
      <label htmlFor="valorG">Valor ganho no dia</label>
      <input 
        id="valorG"
        type="number" 
        value={valorGanho}
        onChange={(e) => setValorGanho(e.target.value)}
      />
      <label htmlFor="horasT">Horas trabalhadas</label>
      <input 
        id="horasT"
        type="number" 
        value={horasTrabalhadas}
        onChange={(e) => setHorasTrabalhadas(e.target.value)}
      />
      <button type="submit">Salvar</button>
      </form>
      </section>
       <section className='gastos'>
      <h2>Resgistrar gasto</h2>
      <form onSubmit={handleSubmitGasto}>
        <label htmlFor='descricaoGasto'>Descreva seu gasto</label>
        <input
        id='descricaoGasto'
        type='text'
        value={descricaoGasto}
        onChange={(e) => setdescricaoGasto(e.target.value)} />
        <label htmlFor='valorGasto'>Qual valor foi gasto</label>
        <input
        id='valorGasto'
        type='number'
        value={valorGasto}
        onChange={(e) => setvalorGasto(e.target.value)} />
        <label htmlFor='dataGasto'>Qual a data do gasto</label>
        <input
        id='dataGasto'
        type='date'
        value={dataGasto}
        onChange={(e) => setdataGasto(e.target.value)} />
        <button type="submit">Salvar Gasto</button>
      </form>
      </section>
    </>
  )
}
export default App
