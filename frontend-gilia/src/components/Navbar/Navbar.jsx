import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined, BulbOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ activeSection, setActiveSection }) => {
  const [visible, setVisible] = useState(false);
  const [esCelular, setEsCelular] = useState(window.innerWidth < 768);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setEsCelular(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.setProperty("--background-color", theme.token.backgroundColor);
    document.body.style.setProperty("--itemSelectedColor", theme.token.itemSelectedColor);
    document.body.style.setProperty("--colorTextBase", theme.token.colorTextBase);
  }, [theme]);

  const handleMenuItemClick = (e) => {
    setActiveSection(e.key);
    if (esCelular) {
      setVisible(false);
    }
  };

  const menuItems = [
    { key: "home", label: <Link to="/">Inicio</Link>, className: "Menu-item" },
    {
      key: "projects",
      label: "Líneas de Investigación",
      className: "Menu-item",
      children: [
        {
          key: "ai-research",
          label: <Link to="/lineas-de-investigacion/ia">Inteligencia Artificial</Link>,
        },
        {
          key: "software-engineering",
          label: <Link to="/lineas-de-investigacion/se">Ingeniería de Software</Link>,
        },
        {
          key: "data-science",
          label: <Link to="/lineas-de-investigacion/ds">Ciencia de Datos</Link>,
        },
      ],
    },
    { key: "goal", label: <Link to="/">Objetivos</Link>, className: "Menu-item" },
    { key: "publications", label: <Link to="/">Publicaciones</Link>, className: "Menu-item" },
    { key: "extension", label: <Link to="/">Extensión</Link>, className: "Menu-item" },
    { key: "about-us", label: <Link to="/about-us">¿Quiénes Somos?</Link>, className: "Menu-item" },
  ];

  return (
    <div className="Menu-Container" style={{ backgroundColor: theme.token.backgroundColor }}>
      <div className="logo-item">
        <span className="logo-text" style={{ color: theme.token.colorTextBase }}>
          GILIA
        </span>
      </div>

      {esCelular ? (
        <>
          <Button
            className="menu-button"
            type="text"
            icon={<MenuOutlined style={{ marginTop: "40%", fontSize: "22px" }} />}
            onClick={() => setVisible(true)}
          />
          <Drawer
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: theme.token.colorTextBase }}>Menú</span>
                <Button
                  type="text"
                  onClick={toggleTheme}
                  icon={theme.token.backgroundColor === "#121212" ? <BulbOutlined /> : <MoonOutlined />}
                />
              </div>
            }
            placement="right"
            onClose={() => setVisible(false)}
            open={visible}
            style={{ backgroundColor: theme.token.backgroundColor }}
          >
            <Menu
              mode="vertical"
              selectedKeys={[activeSection]}
              onClick={handleMenuItemClick}
              items={menuItems}
              style={{ backgroundColor: theme.token.backgroundColor }}
            />
          </Drawer>
        </>
      ) : (
        <>
          <Menu
            mode="horizontal"
            selectedKeys={[activeSection]}
            onClick={handleMenuItemClick}
            items={menuItems}
            style={{ backgroundColor: theme.token.backgroundColor, flex: 1, overflow: "visible", justifyContent: "end"}}
          />
          <div className="theme-toggle-container">
            <Button type="text" onClick={toggleTheme} className="theme-toggle-button">
              {theme.token.backgroundColor === "#121212" ? <BulbOutlined /> : <MoonOutlined />}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

Navbar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

export default Navbar;
