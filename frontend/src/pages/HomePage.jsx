import { useEffect } from "react"
import { useProductStore } from "../store/productStore"
import { Container, SimpleGrid, textDecoration, VStack } from "@chakra-ui/react"
import {ProductCard} from "../components/ProductCard"

/**
 * The home page component.
 * 
 * This component renders a page with a title and a grid of product cards.
 * When the component mounts, it fetches the products from the server and
 * updates the state.
 * If there are no products, it renders a message with a link to the create
 * product page.
 * @returns {React.ReactElement} The home page component.
 */
const HomePage = () => {
    const {fetchProducts, products} = useProductStore()

    useEffect(() => {
        fetchProducts
    }, [fetchProducts])

    console.log("products ", products)

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                  frontSize={"30"}
                  fontWeight={"bold"}
                  bgGradient={"linear(to-r, cyan.400, blue.500)"}
                  bgClip={"text"}
                  textAlign={"center"}
                >
                    Current Products 🚀 
                </Text>
                <SimpleGrid columns={{
                    base: 1,
                    md: 2,
                    lg: 3,
                }}
                spacing={10}
                w={"full"}
                >
                    {products.map((product) => {
                        <ProductCard key={product._id} product={product} />
                    })}
                </SimpleGrid>
                {products.length === 0 && (
                             <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                                No Porducts Found 😱 
                                <Link to={"/create"}>
                                  <Text as='span' color='bue.500' _hover={{
                                    textDecoration: "underline"
                                  }}>
                                    Create a product
                                  </Text>
                                </Link>
                             </Text>
                )}
            </VStack>
        </Container>
    )
}

export default HomePage