export default function ErrorHandling({error}){
    return (
        <div>
            {console.log(error)}
            <h2>Uh Oh...</h2>
            <p>An error occured while trying to fetch data: </p>
            <pre>{error.message}</pre>
        </div>
    )
}