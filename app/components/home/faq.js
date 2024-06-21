import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Creating an account is simple. Click on the "Sign In" button on the top right corner of the homepage, fill in your personal details including your email, username, and password. You will receive a confirmation email. Click on the link in the email to activate your account and start using the marketplace.',
    },
    {
      question: 'How can I list an item for sale?',
      answer: 'To list an item for sale, log in to your account and go to the "Sell" section. Provide detailed information about your item, including a title, description, price, and high-quality images. Select the appropriate category and condition of the item. After reviewing your details, click "Submit" to list your item on the marketplace.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept various payment methods including credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. During checkout, you can choose your preferred payment method. For sellers, we support direct deposits to your bank account or transfers to your PayPal account.',
    },
    {
      question: 'Can I return an item I purchased?',
      answer: 'Yes, most items can be returned within 14 days of receipt. To initiate a return, log in to your account, go to your order history, and select the item you want to return. Follow the instructions to generate a return label. Ensure the item is in its original condition and packaging. Return shipping costs may apply, depending on the seller\'s return policy.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can contact our customer support team via the "Contact Us" page on our website. We offer 24/7 support through live chat, email, and phone. Our team is here to help with any inquiries or issues you may have, ensuring a smooth and satisfactory experience on our marketplace.',
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl flex flex-col items-center justify-center bg-white text-black mx-auto my-20">
      <p className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Frequently Asked Questions</p>
      <div className="w-full">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              className="text-xl font-semibold focus:outline-none flex justify-between items-center w-full border border-gray-300 p-4 rounded-lg"
              onClick={() => toggleExpand(index)}
            >
              {faq.question}
              {expandedIndex === index ? (
                <FaChevronDown className="ml-2" />
              ) : (
                <FaChevronRight className="ml-2" />
              )}
            </button>
            {expandedIndex === index && (
              <div className="mt-2 text-lg p-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
