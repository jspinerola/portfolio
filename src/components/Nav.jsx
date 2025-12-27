import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "mailto:julianspindola@gmail.com" },
  ];

  return (
    <>
      {/* desktop */}
      <ul className="flex-1 space-x-4 font-heading hidden md:flex">
        {navItems.map((item) => (
          <li key={item.name}>
            <a href={item.href} className="hover:underline">
              {item.name.toLowerCase()}
            </a>
          </li>
        ))}
      </ul>

      {/* mobile */}
      <div className="flex-1 flex md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open menu</span>
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[200px]">
            <SheetHeader>
              <SheetTitle className="lowercase font-black">Menu</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col font-heading px-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:underline">
                    {item.name.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default Nav;
