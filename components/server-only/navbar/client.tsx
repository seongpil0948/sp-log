"use client";

import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import commonConfig from "@/config";
import { typo } from "@/components/server-only/primitives";
import { usePathname, useRouter } from "next/navigation";
import { TreeSectionProps } from "../../client-only/tree-section";
import { IGetTreeArgs } from "@/app/_utils/server/dir-tree";
import { NavbarSlots, SlotsToClasses } from "@nextui-org/theme";
import { CommonDrawerProps } from "../../client-only/drawer";
import { extractFromPath } from "@/app/_utils/common/locale";
import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

export interface CommonNavbarProps {
  tree?: TreeSectionProps;
  children?: React.ReactNode;

  leftTreeOptions: IGetTreeArgs;
  treeLeft?: TreeSectionProps;
  prefix?: React.ReactNode;
  classes?: SlotsToClasses<NavbarSlots>;
  drawerProps?: Omit<CommonDrawerProps, "children">;
}
// const ListboxWrapper = (props: { children: ReactNode }) => (
//   <div className="w-full md:max-w-[60vw] max-h-[50vh] overflow-auto  px-1 py-2 border-none ">
//     {props.children}
//   </div>
// );
export function NavInput() {
  // const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  // const [keyword, setKeyword] = useState<string>("");
  // const [searching, setSearching] = useState<boolean>(false);
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const router = useRouter();
  console.log("process.env", process.env);

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
                  appId={process.env.ALGOLIA_APP_ID ?? ""}
                  indexName={process.env.ALGOLIA_INDEX_NAME ?? ""}
                  apiKey={process.env.ALGOLIA_SEARCH_KEY ?? ""}
                /> */}
      {/* https://docsearch.algolia.com/docs/DocSearch-v3 */}
      <DocSearch
        appId="R2IYF7ETH7"
        apiKey="599cec31baffa4868cae4e79f180729b"
        indexName="docsearch"
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
export const NavMobileMenu = () => {
  const pathName = usePathname();
  let { locale } = extractFromPath(pathName);
  if (!locale) locale = commonConfig.i18n.defaultLocale;
  return (
    <NavbarMenu className="m-0 p-0">
      <div className="flex flex-col gap-2">
        {siteConfig.links.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className="px-8 mt-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
          >
            <Link
              className={typo({
                type: "link",
                size: "lg",
                color: pathName.includes(item.href)
                  ? "primary"
                  : item.external
                  ? "danger"
                  : "foreground",
              })}
              // color="foreground"
              href={item.href}
              size="lg"
            >
              {item.label[locale]}
            </Link>
          </NavbarMenuItem>
        ))}
      </div>
    </NavbarMenu>
  );
};

export default NavMobileMenu;
