import LayoutCobranza from "../../../components/Layouts/LayoutCobranza";
import CobranzaActions from "./CobranzaActions";
import CobranzaComments from "./CobranzaComments";
import CobranzaInfo from "./CobranzaInfo";
import CobranzaSearch from "./CobranzaSearch";

const CompanyCobranza = () => {
  return (
    <LayoutCobranza
      leftHeader={<CobranzaSearch />}
      leftActions={<CobranzaActions />}
      leftContent={<CobranzaInfo />}
      rightComments={<CobranzaComments />}
    />
  );
};

export default CompanyCobranza;
