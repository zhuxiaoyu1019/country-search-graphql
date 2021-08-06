import React, { useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

const QUERY_SEARCH_COUNTRY = gql`
    query Country($code: ID!) {
        country(code: $code) {
            name
            capital
            emoji
            code
            currency
        }
    }
`;

function Search() {
    const [countrySearch, setCountrySearch] = useState('');
    const [searchCountry, { data, loading, error }] = useLazyQuery(QUERY_SEARCH_COUNTRY);

    return (
        <div>
            <div className='inputs'>
                <Link to='/'>All Countries</Link>
                <input type="text" placeholder='Enter Country Code (ex. BRL)...' onChange={(event) => { setCountrySearch(event.target.value) }} />
                <button onClick={() => { searchCountry({ variables: { code: countrySearch.toUpperCase() } }) }}>Search Country </button>
            </div>
            <div>
                {data && <h1>{data.country.name}</h1>}
            </div>
        </div>
    )
}

export default Search
