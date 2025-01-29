const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Panlasang Pinoy</h3>
            <p className="text-gray-300">
              Bringing authentic Filipino cuisine to your doorstep. Experience the
              taste of traditional Filipino dishes made with love and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/menu" className="text-gray-300 hover:text-white">Menu</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-white">Cart</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@panlasangpinoy.com</li>
              <li>Phone: +63 123 456 7890</li>
              <li>Address: Manila, Philippines</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Panlasang Pinoy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
