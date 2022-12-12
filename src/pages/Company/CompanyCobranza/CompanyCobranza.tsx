import LayoutCobranza from "../../../components/Layouts/LayoutCobranza";
import CobranzaActions from "./CobranzaActions";
import CobranzaInfo from "./CobranzaInfo";
import CobranzaSearch from "./CobranzaSearch";

const CompanyCobranza = () => {
  return (
    <LayoutCobranza
      leftHeader={<CobranzaSearch />}
      leftActions={<CobranzaActions />}
      leftContent={<CobranzaInfo />}
    />
  );
};

export default CompanyCobranza;
