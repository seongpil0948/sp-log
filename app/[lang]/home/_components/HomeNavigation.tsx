import { motion } from "framer-motion";

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
const ulVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemIds = [0, 1, 2, 3, 4];
export const HomeNavigation = () => (
  <motion.ul
    variants={ulVariants}
    style={{
      maxWidth: "30vw",
      maxHeight: "40vh",
    }}
  >
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
);
const MenuItem = ({ i }: { i: number }) => {
  return (
    <motion.li
      key={i}
      variants={menuItemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        listStyle: "none",
        marginBottom: "1rem",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        color: "white",
        background: "hsl(240, 5.83%, 10.08%)",
        minHeight: "10vh",
        borderRadius: "1rem",
      }}
    >
      hi
    </motion.li>
  );
};

export default HomeNavigation;
