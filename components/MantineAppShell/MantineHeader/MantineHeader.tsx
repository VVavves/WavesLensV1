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
  useMantineTheme,
  ActionIcon,
  Tooltip,
  Badge,
  Space,
  Menu,
  Avatar,
  Modal,
  Center,
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
import { CiLogin } from "react-icons/ci";
import { ColorSchemeToggle } from "../../ColorSchemeToggle";
import { SessionType, useSession, useLogout } from "@lens-protocol/react-web";

export function MantineHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { data: session } = useSession();
  const { execute, loading: isPending } = useLogout();

  const logout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    void execute();
  };

  return (
    <>
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
              <Tooltip
                label="Notifications"
                withArrow
                position="bottom"
                offset={3}
              >
                <ActionIcon
                  component={Link}
                  href="/notifications"
                  variant="gradient"
                  size="xl"
                  aria-label="Gradient action icon"
                  gradient={{ from: "blue", to: "cyan", deg: 270 }}
                >
                  <IconBellRinging />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Why Waves" withArrow position="bottom" offset={3}>
                <ActionIcon
                  component={Link}
                  href="/why"
                  variant="gradient"
                  size="xl"
                  aria-label="Gradient action icon"
                  gradient={{ from: "blue", to: "cyan", deg: 270 }}
                >
                  <PiSealQuestion size="1.7rem" />
                </ActionIcon>
              </Tooltip>
            </Group>

            <Group visibleFrom="sm">
              <ColorSchemeToggle />

              {/* Wallet + Active Lens Profile */}
              {session?.authenticated && (
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
                      <Avatar size="md" radius="md" mx="auto" />
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconLogout size={17} />}
                        disabled={isPending}
                        onClick={logout}
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
                      leftSection={<IconLogout size={17} />}
                      disabled={isPending}
                      onClick={logout}
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
