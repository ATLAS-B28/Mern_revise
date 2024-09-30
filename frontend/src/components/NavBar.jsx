import { Button, Container, Flex, HStack, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import {PlusSquareIcon} from "@chakra-ui/icons"
import {IoMoon} from "react-icons/io5"
import {LuSun} from "react-icons/lu"

/**
 * The navbar component.
 * 
 * This component renders a horizontal navigation bar with two parts.
 * The left part contains a link to the home page with a bold, uppercase, and
 * gradient text.
 * The right part contains a create button and a toggle button for the color
 * mode.
 * @returns {React.ReactElement} The navbar component.
 */
const NavBar = () => {
    const {colorMode, toggleColorMode} = useColorMode()

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
              h={16}
              alignItems={"center"}
              justifyContent={"space-between"}
              flexDir={{
                base: "column",
                sm: "row",
              }}
            >
                <Text
                  fontSize={{base: "22", sm: "28"}}
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
				  textAlign={"center"}
				  bgGradient={"linear(to-r, cyan.400, blue.500)"}
				  bgClip={"text"}
                >
                    <Link to={"/"}>Product Store 🛍 </Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon />: <LuSun size='20'/>}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}