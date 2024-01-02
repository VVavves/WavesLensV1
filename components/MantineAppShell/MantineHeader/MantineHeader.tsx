import {
  Group,
  Button,
  UnstyledButton,
  Text,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  ActionIcon,
  Tooltip,
  Badge,
  Space,
  Menu,
  Avatar,
  Modal,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBellRinging,
  IconHome2,
  IconWallet,
  IconLogout,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import classes from "./MantineHeader.module.css";
import Link from "next/link";
import { GiWaveCrest } from "react-icons/gi";
import { PiSealQuestion } from "react-icons/pi";
import { ColorSchemeToggle } from "../../ColorSchemeToggle";
import { SessionType, useSession, useLogout } from "@lens-protocol/react-web";
import { useDisconnect } from "@thirdweb-dev/react";
import { BiSearchAlt } from "react-icons/bi";
import { SearchUsers } from "@/components/SearchUsers";
import { SearchPosts } from "@/components/SearchPosts";
import { Create } from "@/components/create";
import { BsPlusCircleDotted } from "react-icons/bs";
import Notifications from "../../../pages/notifications";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbUserFilled } from "react-icons/tb";
import { FaCommentDots } from "react-icons/fa6";

export function MantineHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [openedSearch, { open: openSearch, close: closeSearch }] =
    useDisclosure(false);
  const [openedCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [openedNotifs, { toggle: openNotifs, close: closeNotifs }] =
    useDisclosure(false);
  const { data: session } = useSession();


  const router = useRouter();
  const { execute, loading: isPending } = useLogout();
  const disconnect = useDisconnect();
 const [searchType, setSearchType] = useState("Users"); // Default is "Users"
 const theme = useMantineTheme();
  const handleToggle = () => {
    setSearchType(prevType => prevType === "Users" ? "Posts" : "Users");
  };

  return (
    <>
      {/* Modal content */}
      <Modal
        yOffset={222}
        size="md"
        
        withCloseButton={false}
        opened={openedSearch}
        onClose={() => {
          closeSearch();
          setSearchType("Users");
      }}
      >
        <Space h="md" />
          <Group justify="center">
     <Tooltip label={searchType === "Users" ? (
         <>
         Search Users
        </>
      ) : (
        <>
        Search Posts
        </>
      )} refProp="rootRef">
        <Switch
          checked={searchType === "Posts"}
          onChange={() => {handleToggle();}}
          size="xl"
          onLabel={<FaCommentDots size="1.3rem" style={{ width: rem(16), height: rem(16) }}
     />} 
          offLabel={<TbUserFilled color={theme.colors.blue[6]} size="1.3rem" style={{ width: rem(16), height: rem(16) }}
      />}
        />
        </Tooltip>
      </Group>
      <Space h="md" />

      {searchType === "Users" && (
        
         <>
         {/* @ts-ignore */}
        <SearchUsers closeSearch={closeSearch} />
      </>
      )}
      {searchType === "Posts" && (
        <>
         {/* @ts-ignore */}
        <SearchPosts closeSearch={closeSearch} />
        </>
      )}
       
      </Modal>

      <Modal size="xl" opened={openedCreate} onClose={closeCreate}>
        <Create />
      </Modal>

      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <UnstyledButton component={Link} href="/">
              <Group>
                <Text
                  size="xl"
                  fw={900}
                  fs="italic"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  Waves
                </Text>
                <Badge
                  variant="filled"
                  color="blue"
                  radius="sm"
                  className={classes.betaTag}
                >
                  BETA
                </Badge>
              </Group>
            </UnstyledButton>
            <Group h="100%" visibleFrom="sm">
              {session?.type === "WITH_PROFILE" && (
                <Tooltip label="Create Post">
                  <ActionIcon
                    onClick={openCreate}
                    variant="light"
                    size="lg"
                    radius="xl"
                  >
                    <BsPlusCircleDotted size="1.3rem" />
                  </ActionIcon>
                </Tooltip>
              )}

              <Tooltip label="Home" withArrow position="bottom" offset={3}>
                <ActionIcon
                  component={Link}
                  href="/"
                  variant="gradient"
                  size="xl"
                  aria-label="Gradient action icon"
                  gradient={{ from: "blue", to: "cyan", deg: 360 }}
                >
                  <IconHome2 />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dashboard" withArrow position="bottom" offset={3}>
                <ActionIcon
                  component={Link}
                  href="/dashboard"
                  variant="gradient"
                  size="xl"
                  aria-label="Gradient action icon"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  <IconLayoutDashboard />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Wallet" withArrow position="bottom" offset={3}>
                <ActionIcon
                  component={Link}
                  href="/wallet"
                  variant="gradient"
                  size="xl"
                  aria-label="Gradient action icon"
                  gradient={{ from: "blue", to: "cyan", deg: 150 }}
                >
                  <IconWallet />
                </ActionIcon>
              </Tooltip>

              <Menu
                trigger="hover"
                openDelay={100}
                shadow="md"
                width={555}
                zIndex={1000000}
              >
                <Menu.Target>
                  <ActionIcon
                  component={Link}
                  href="/notifications"
                    variant="gradient"
                    size="xl"
                    aria-label="Gradient action icon"
                    gradient={{ from: "blue", to: "cyan", deg: 270 }}
                    onMouseEnter={openNotifs}
                  >
                    <IconBellRinging />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown
                  style={{
                    maxHeight: "555px", // Adjust this value based on your preference
                    overflowY: "auto",
                  }}
                >
                  <Notifications />
                </Menu.Dropdown>
              </Menu>

              <Tooltip label="Why Waves" withArrow position="bottom" offset={3}>
                <ActionIcon
                  component={Link}
                  href="/why"
                  variant="gradient"
                  size="xl"
                  aria-label="Gradient action icon"
                  gradient={{ from: "blue", to: "cyan", deg: 360 }}
                >
                  <PiSealQuestion size="1.7rem" />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Search Lens Profile and Posts">
                <ActionIcon
                  onClick={openSearch}
                  variant="light"
                  size="lg"
                  radius="xl"
                >
                  <BiSearchAlt size="1.2rem" />
                </ActionIcon>
              </Tooltip>
            </Group>

            <Group visibleFrom="sm">
              <ColorSchemeToggle />

              {/* Wallet + Active Lens Profile */}
              {session?.authenticated && session?.type === "WITH_PROFILE" && (
                <>
                  <Menu
                    trigger="hover"
                    openDelay={100}
                    closeDelay={400}
                    shadow="md"
                    width={200}
                    zIndex={1000000}
                  >
                    <Menu.Target>
                      <Avatar
                        size="md"
                        radius="xl"
                        mx="auto" 
                        src={
                          // @ts-ignore
                          session?.profile?.metadata?.picture.optimized.uri ||
                          "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                        }
                      />
                    </Menu.Target>

                    <Menu.Divider />
                    
                    <Menu.Dropdown>
                 

                              <Menu.Label>Visit Lens Explorer</Menu.Label>
                              <Menu.Item
                                onClick={() =>
                                  window.open(
                                    "https://momoka.lens.xyz/",
                                    "_blank"
                                  )
                                }
                                leftSection={<Avatar src="https://pbs.twimg.com/profile_images/1654121403669680129/Ebc2fvyq_400x400.jpg" size={17} />}
                              >
                                Lens Explorer
                              </Menu.Item>

                              <Menu.Divider />
                      <Menu.Item
                        onClick={(e: any) => {
                          e.preventDefault();
                          execute();
                          disconnect();
                        }}
                        disabled={isPending}
                        leftSection={<IconLogout size={17} color="red" />}
                      >
                        Sign Out
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </>
              )}
              {/* No Wallet + No Lens Profile */}
              {!session?.authenticated && (
                <>
                  <Button
                    leftSection={<GiWaveCrest size="1rem" />}
                    component={Link}
                    href="/login"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="70%"
          padding="md"
          title={
            <Text
              fw={700}
              size="xl"
              fs="italic"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              Waves
            </Text>
          }
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
            
            <Group p="md">
               
              <ColorSchemeToggle />

              
            </Group>

            <Link href="/" className={classes.link} onClick={closeDrawer}>
              <ActionIcon
                variant="gradient"
                size="xl"
                aria-label="Gradient action icon"
                gradient={{ from: "blue", to: "cyan", deg: 360 }}
              >
                <IconHome2 />
              </ActionIcon>
              <Space w="md" />
              Home
            </Link>
            <Space h="md" />
            <Link
              href="/dashboard"
              className={classes.link}
              onClick={closeDrawer}
            >
              <ActionIcon
                variant="gradient"
                size="xl"
                aria-label="Gradient action icon"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
              >
                <IconLayoutDashboard />
              </ActionIcon>
              <Space w="md" />
              Dashboard
            </Link>
            <Space h="md" />
            <Link href="/wallet" className={classes.link} onClick={closeDrawer}>
              <ActionIcon
                variant="gradient"
                size="xl"
                aria-label="Gradient action icon"
                gradient={{ from: "blue", to: "cyan", deg: 150 }}
              >
                <IconWallet />
              </ActionIcon>
              <Space w="md" />
              Wallet
            </Link>
            <Space h="md" />
            <Link
              href="/notifications"
              className={classes.link}
              onClick={closeDrawer}
            >
              <ActionIcon
                variant="gradient"
                size="xl"
                aria-label="Gradient action icon"
                gradient={{ from: "blue", to: "cyan", deg: 270 }}
              >
                <IconBellRinging />
              </ActionIcon>
              <Space w="md" />
              Notifications
            </Link>
            <Space h="md" />
            <Link href="/why" className={classes.link} onClick={closeDrawer}>
              <ActionIcon
                variant="gradient"
                size="xl"
                aria-label="Gradient action icon"
                gradient={{ from: "blue", to: "cyan", deg: 270 }}
              >
                <PiSealQuestion size="1.7rem" />
              </ActionIcon>
              <Space w="md" />
              Why Waves
            </Link>
            <Space h="md" />
            <Group className={classes.link}>
          <ActionIcon
          onClick={() =>{
                    openSearch();
                    closeDrawer();
                }}
                
                variant="gradient"
                size="xl"
                aria-label="Gradient action icon"
                gradient={{ from: "blue", to: "cyan", deg: 270 }}
              >
                <BiSearchAlt size="1.7rem" />
              </ActionIcon>
              
              Search
              </Group>
              <Space h="md" />
            <Group align="center" grow pb="xl" px="md">
              {session?.authenticated ? (
                <Menu shadow="md" width={200} zIndex={1000000}>
                  <Menu.Target>
                    <Button
                      leftSection={<GiWaveCrest size="1rem" />}
                      variant="gradient"
                      gradient={{ from: "cyan", to: "indigo" }}
                    >
                      {session.type === SessionType.WithProfile
                        ? session.profile?.metadata?.displayName ??
                          session.profile.handle?.fullHandle ??
                          session.profile.id
                        : session.address}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconLogout size={17} color="red" />}
                      onClick={(e: any) => {
                        e.preventDefault();
                        execute();
                        disconnect();
                      }}
                      disabled={isPending}
                    >
                      Sign Out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <>
                  <Button component={Link} href="/login">
                    Sign In
                  </Button>
                </>
              )}
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
}
