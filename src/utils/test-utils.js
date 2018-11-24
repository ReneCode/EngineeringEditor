// test-utils.js
import { render } from "react-testing-library";
import { ThemeProvider } from "my-ui-lib";
import { TranslationProvider } from "my-i18n-lib";
import defaultStrings from "i18n/en-x-default";

const customRender = (node, options) => {
  return render(
    <ThemeProvider theme="light">
      <TranslationProvider messages={defaultStrings}>
        {node}
      </TranslationProvider>
    </ThemeProvider>,
    options,
  );
};

// re-export everything
export * from "react-testing-library";

// override render method
export { customRender as render };
