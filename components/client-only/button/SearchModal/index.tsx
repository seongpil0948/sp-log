"use client";

import { DocSearch } from "@docsearch/react";
import { TAvailLocale } from "@/config";
import "@docsearch/css";
import "./custom.css";

export function SearchModal(props: { locale: TAvailLocale }) {
  const { locale } = props;
  // const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  // const [keyword, setKeyword] = useState<string>("");
  // const [searching, setSearching] = useState<boolean>(false);
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const router = useRouter();

  // const handleKeywordChange = (value: string) => {
  //   setKeyword(value);
  //   if (value.length > 0) {
  //     setSearching(true);
  //     fetch(`/api/search?keyword=${value}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setSearchResults(data.results);
  //         setSearching(false);
  //       });
  //   }
  // };

  return (
    <>
      {/* <DocSearch
                  appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ""}
                  indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? ""}
                  apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? ""}
                /> */}
      {/* https://docsearch.algolia.com/docs/DocSearch-v3 */}
      <DocSearch
        appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
        apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
        translations={{
          button: {
            buttonText: locale === "en" ? "Search..." : "검색 팡팡!",
          },
        }}
        // https://docsearch.algolia.com/docs/record-extractor/#indexing-content-for-faceting
        // https://docsearch.algolia.com/docs/required-configuration/#introduce-global-information-as-meta-tags
        // searchParameters={{
        //   facetFilters: ["language:en", "version:1.0.0"],
        // }}
      />
      {/* <Button
        aria-label="Search"
        onPress={onOpen}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        size="lg"
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="button"
        className={clsx(
          "px-3",
          typo({
            size: "xs",
            font: "mono",
            color: "foreground",
          })
        )}
      >
        Search
      </Button>

      <Modal
        backdrop="blur"
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <Input
                  value={keyword}
                  onValueChange={handleKeywordChange}
                  aria-label="Search"
                  classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm",
                  }}
                  endContent={
                    <Kbd className="hidden lg:inline-block" keys={["command"]}>
                      ESC
                    </Kbd>
                  }
                  labelPlacement="outside"
                  placeholder="Search..."
                  startContent={
                    <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="search"
                />
              </ModalHeader>
              <ModalBody>
                {searching ? (
                  <>
                    <Spinner
                      className="m-auto"
                      labelColor="secondary"
                      color="primary"
                    >
                      <p className="text-center">Searching...</p>
                    </Spinner>
                  </>
                ) : (
                  <>
                    {searchResults.length === 0 ? (
                      <p className="text-center">No results found</p>
                    ) : (
                      <ListboxWrapper>
                        <Listbox
                          variant="flat"
                          aria-label="Listbox menu with descriptions"
                        >
                          {searchResults.map((result, index1) => (
                            <ListboxSection
                              key={result.href + index1}
                              title={result.href}
                              showDivider
                            >
                              {result.matchedContent.map((content, index2) => (
                                <ListboxItem
                                  key={result.href + index1 + index2}
                                  description={result.title}
                                  onClick={() => {
                                    router.push(result.href);
                                    onClose();
                                  }}
                                >
                                  {content}
                                </ListboxItem>
                              ))}
                            </ListboxSection>
                          ))}
                        </Listbox>
                      </ListboxWrapper>
                    )}
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
}

// const ListboxWrapper = (props: { children: ReactNode }) => (
//   <div className="w-full md:max-w-[60vw] max-h-[50vh] overflow-auto  px-1 py-2 border-none ">
//     {props.children}
//   </div>
// );

export default SearchModal;
