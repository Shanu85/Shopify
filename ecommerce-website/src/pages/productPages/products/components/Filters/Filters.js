import React from "react";

import MyExpansionPanel from "@components/layouts/MyExpansionPanel";
import PriceFilter from "./PriceFilter";
import OnlyAvailable from "./OnlyAvailable";
import SearchInResults from "./SearchInResults";
import SubmittedFilters from "./SubmittedFilters";
import CategoryFilter from "./CategoryFilter";

const Filters = ({location}) => {
  return (
    <React.Fragment>
      <SubmittedFilters />
      <SearchInResults />
      <OnlyAvailable />
      <MyExpansionPanel title="Price range">
        <PriceFilter />
      </MyExpansionPanel>
      <CategoryFilter location={location}/>
    </React.Fragment>
  );
};

export default Filters;
