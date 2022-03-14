import { Icon, Div } from "atomize";

function Loader({ isLoading }) {
  if (!isLoading) {
    return <></>;
  }

  return (
    <Div
      className="loader"
      align="center"
      justify="center"
      d="flex"
      flexDir={{ xs: "column", lg: "row" }}
      textWeight="500"
      textAlign="center"
    >
      <Div>
        <Icon name="Loading" size="50px" color="black900" />
      </Div>
    </Div>
  );
}

export default Loader;
