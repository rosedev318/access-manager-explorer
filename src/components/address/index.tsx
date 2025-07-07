import { ComponentProps, FC, useEffect, useRef, useState } from "react";

import { Addreth } from "addreth";
import { useTheme } from "next-themes";
import { useNetwork } from "wagmi";
import { join } from "path";
import { Flex, IconButton } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useEntities } from "@/providers/entities";
import { EntityInstance } from "@/providers/entities/provider";

type IconButtonProps = ComponentProps<typeof IconButton>;

interface Props extends ComponentProps<typeof Flex> {
  addreth: ComponentProps<typeof Addreth>;
  onDetail?: {
    entity: Omit<IconButtonProps, "type"> & EntityInstance;
    at: number;
  };
  hidePopup?: boolean;
}

const Address: FC<Props> = ({ onDetail, addreth, hidePopup, ...props }) => {
  const { theme } = useTheme();
  const { chain } = useNetwork();
  const ref = useRef<HTMLDivElement>(null);

  const entities = useEntities();

  const [isSSR, setIsSSR] = useState(true);

  const onDetailClick = () => {
    if (onDetail) {
      const { entity, at } = onDetail;
      entities.push(entity, at);
    }
  };

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (typeof addreth.theme === "string")
    addreth.theme = { base: addreth.theme };

  return (
    <Flex align="center" {...props}>
      <div ref={ref} style={{ display: "none" }}></div>

      <Addreth
        actions={!chain ? "copy" : "all"}
        explorer={
          chain
            ? (address) => ({
                name: chain.blockExplorers?.default.name ?? "Explorer",
                accountUrl: chain.blockExplorers
                  ? new URL(
                      join("address", address),
                      chain.blockExplorers?.default.url
                    ).href
                  : "",
              })
            : undefined
        }
        {...addreth}
        theme={{
          base: theme == "dark" ? "simple-dark" : "simple-light",
          ...addreth.theme,
        }}
        popupNode={hidePopup ? ref.current ?? undefined : undefined}
      />
      {!isSSR && onDetail && (
        <IconButton
          variant="soft"
          color="gray"
          size="1"
          ml="1"
          onClick={onDetailClick}
          {...onDetail}
          type="button"
        >
          <ArrowRightIcon width="13" height="13" />
        </IconButton>
      )}
    </Flex>
  );
};

export default Address;
