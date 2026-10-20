export default function SolicitudCard({ titulo, prioridad, estado, onResolver }) {
    return (
        <article style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
            <h3>{titulo}</h3>
            <p>Prioridad: <strong>{prioridad}</strong></p>
            <p>Estado: <strong>{estado}</strong></p>
            {onResolver && estado !== 'Resuelta' && (
                <button onClick={onResolver} style={{ marginTop: '5px', cursor: 'pointer' }}>
                    Resolver
                </button>
            )}
        </article>
    )
}