
function generateName(gender) {
    switch (gender) {
        case "male":
            return "Alvin"
            break;
        case "female":
            return "Betty"
            break;
        case "neutral":
            return "Casey"
            break;
    
        default:
            return "Dave"
            break;
    }
}

module.exports = generateName;