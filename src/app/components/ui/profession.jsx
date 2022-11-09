import React from "react";
import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";
/* import { useSelector } from "react-redux"; */
/* import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";
 */
const Profession = ({ id }) => {
    /*  const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    console.log(prof); */

    const { getProfession, isLoading } = useProfessions();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
