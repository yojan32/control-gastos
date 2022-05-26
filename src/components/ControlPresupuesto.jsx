import {useEffect, useState} from 'react'
import { formatearCantidad } from '../helpers'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function ControlPresupuesto({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) {

	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);
	const [porcentaje, setPorcentaje] = useState(0);

	useEffect(() => {
		const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
		const totalDisponible = presupuesto - totalGastado;

		// Calcular porcentaje gastado
		const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

		setDisponible(totalDisponible);
		setGastado(totalGastado);
		setTimeout(() => {
			setPorcentaje(nuevoPorcentaje);	
		}, 1500);
	}, [gastos])

	const handleResetApp = () =>{
		const resultado = confirm('¿Deseas reiniciar el presupueto y los gastos?')

		if (resultado) {
			setGastos([])
			setPresupuesto(0)
			setIsValidPresupuesto(false)
		}
	}

	return (
		<div className='contenedor-presupuesto contenedor sombra dos-columnas'>
			<div>
				<CircularProgressbar 
					value={porcentaje}
					styles={buildStyles({
						pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
						trailColor: '#f5f5f5',
						textColor: '#3b82f6',
					})}
					text={`${porcentaje}% Usado`}
				/>
			</div>
			<div className='contenido-presupuesto'>
				<button className='reset-app' type='button' onClick={handleResetApp}>Reiniciar App</button>
				<p>
					<span>Presupuesto: </span> {formatearCantidad(presupuesto)}
				</p>
				<p className={`${disponible < 0 ? 'negativo' : ''}`}>
					<span>Disponible: </span> {formatearCantidad(disponible)}
				</p>
				<p>
					<span>Gastado: </span> {formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	)
}
