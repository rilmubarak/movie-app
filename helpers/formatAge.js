function formatAge(birthYear, releasedYear){
    const formattedAge = releasedYear - birthYear
    return `${formattedAge} years old`
}

module.exports = formatAge