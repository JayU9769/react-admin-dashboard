import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { useGetDropdownOptionsQuery, rootApi, useGetDropdownValueQuery } from "@/store/root/api.ts";
import { EAPITags } from "@/interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

interface IProps {
  placeholderLabel?: string;
  placeholderInput?: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
}
const Index: React.FC<IProps> = ({ placeholderLabel = "Select Item", placeholderInput = "Search Item", value, type, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  ///////////////////////// Redux States and Actions... /////////////////////////
  const dispatch = useDispatch<AppDispatch>();
  const { data = [] } = useGetDropdownOptionsQuery({ type: type, keyword: keyword });
  const { data: selectedItem } = useGetDropdownValueQuery({ type: type, value }, { skip: !value });
  console.log(selectedItem);
  //   useEffect(() => {
  //     return () => {
  //       dispatch(rootApi.util.invalidateTags([{ type: EAPITags.DROPDOWN_OPTIONS, id: type }]));
  //     };
  //   }, [dispatch, type]);

  useEffect(() => {
    const timeout = setTimeout(() => setKeyword(search), 250);
    return () => clearTimeout(timeout);
  }, [dispatch, search, type]);

  const handleBlur = () => {
    if (search) {
      setSearch("");
      dispatch(rootApi.util.invalidateTags([{ type: EAPITags.DROPDOWN_OPTIONS, id: type }]));
    }
  };

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className={cn("w-full justify-between", !value && "text-muted-foreground")}>
          {selectedItem ? selectedItem?.label : `${placeholderLabel}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content-width-full p-0">
        <Command>
          <CommandInput placeholder={placeholderInput} value={search} onValueChange={(e) => setSearch(e)} onBlur={handleBlur} />
          <CommandList>
            <CommandEmpty>No Results.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  value={item.label}
                  key={item.value}
                  onSelect={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", item.value === value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Index;
