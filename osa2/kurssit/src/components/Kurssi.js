import React from 'react'

const Otsikko = ({ kurssi }) => {
    return (
        <div>
            <h1>{kurssi.kurssi}</h1>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa.nimi} {props.osa.tehtavia}</p>
        </div>
    )
}

const Sisalto = ({ kurssi }) => {
    const osat = kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)
    return (
        <div>
            {osat}
        </div>
    )
}

const Yhteensa = ({ osat }) => {
    const tehtavat = osat.map(osa => osa.tehtavia)
    const summaaja = (tehtavaMaara, summa) => tehtavaMaara + summa

    const yhteensa = tehtavat.reduce(summaaja, 0)

    return (
        <div>
            <p>yhteensä {yhteensa} tehtävää</p>
        </div>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi