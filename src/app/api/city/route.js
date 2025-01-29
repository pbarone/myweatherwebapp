export const revalidate = 60

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams

    try {
        // Extract and validate latitude
        //const latitude = parseFloat(searchParams.get('latitude'));

        let coords = {latitude: parseFloat(searchParams.get('latitude')), longitude:parseFloat(searchParams.get('longitude'))};
        //console.log(coords);

        // to debug location search set this to any coordinates
        // coords = {latitude: 20.719350, longitude: -2.772628};

        
        if (isNaN(coords.latitude) || coords.latitude < -90 || coords.latitude > 90) {
            throw new Error('Invalid latitude. Latitude must be a number between -90 and 90.');
        }

        // Extract and validate longitude
        //const longitude = parseFloat(searchParams.get('longitude'));
        if (isNaN(coords.longitude) || coords.longitude < -180 || coords.longitude > 180) {
            throw new Error('Invalid longitude. Longitude must be a number between -180 and 180.');
        }

        const cityURL = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${coords.latitude}%2C${coords.longitude}&details=true`;
        const response = await fetch(cityURL);
        const data = await response.json();

        return Response.json(data);

    } catch (error) {
        console.error('Error extracting or validating coordinates:', error.message);

        // Handle the error (e.g., return a response or throw a specific error)
        // Example response:
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return Response.json({ message: 'Coordinates extracted and validated successfully.' });
}